import {
  Action,
  ASSEMBLING,
  BUYING_ROBOT,
  isActionWithDuration,
  isActionWithRandomDuration,
  MINING_BAR,
  MINING_FOO,
  MOVING,
  NeededRessources,
  Ressources,
  WAITING,
} from "./actions";
import Location from "./locations";
import { ObservableRobot, ObservedRobot } from "./Observable";
import { RandomGenerator, RealRandomGenerator } from "./RandomGenerator";
import { Store } from "./Store";

type RobotOptions = {
  randomGenerator?: RandomGenerator;
  initialLocation?: Location;
};

/**
 * The robot is the main character. It does nothing by itself except
 * finishing the execution of the actions it was asked to start.
 * To make it finish its actions, it needs to get regularly its method
 * tick() called with the current time.
 */
class Robot {
  private location: Location;
  private action: Action;
  private randomGenerator: RandomGenerator;
  private nextLocation: Location | null;
  private actionStartTime: number | null;
  private keepLocation;
  private observable: ObservableRobot;
  private previousAction: Action;

  constructor(private store: Store, options?: RobotOptions) {
    this.keepLocation = false;
    this.action = WAITING;
    this.previousAction = WAITING;
    this.actionStartTime = null;
    this.observable = store.getRobotsObservable();
    this.store.addRobot(this);
    this.nextLocation = null;
    this.setNextLocation(this.nextLocation);
    this.location = Location.SHOP;
    this.setLocation(
      options?.initialLocation ? options.initialLocation : Location.SHOP
    );
    this.randomGenerator = options?.randomGenerator
      ? options?.randomGenerator
      : new RealRandomGenerator();
  }

  /**
   * If the current action duration has been reached, ends the
   * action to make the robot available again, and executes its
   * consequences.
   * @param currentTime the current time in miliseconds.
   */
  tick(currentTime: number) {
    if (this.actionStartTime !== null) {
      const actionAlreadyExecutedDuration = currentTime - this.actionStartTime;
      let actionTotalDuration: number;
      if (isActionWithRandomDuration(this.action)) {
        actionTotalDuration = this.randomGenerator.randomBetweenTwoValues(
          ...this.action.totalDurationIn
        );
      } else if (isActionWithDuration(this.action)) {
        actionTotalDuration = this.action.totalDuration;
      } else {
        throw new Error(
          `Action total duration has not been found for action ${this.action}.`
        );
      }
      if (actionAlreadyExecutedDuration >= actionTotalDuration) {
        this._endAction();
      }
    }
  }

  private _endAction() {
    if (this.action === MOVING) {
      this._endMove();
    } else {
      this._endLocationRelatedAction(this.action);
    }
    this.setAction(WAITING);
    this.actionStartTime = null;
  }

  private _endMove() {
    this._checkLocationSpecified();
    this.setLocation(this.nextLocation as Location);
    this.setNextLocation(null);
  }

  private _checkLocationSpecified() {
    if (!this.getNextLocation()) {
      throw new Error(
        "The robot can't start or end moving without next location specified."
      );
    }
  }

  private _endLocationRelatedAction(action: Action) {
    let isActionSuccessful = action.successPercentage
      ? this.randomGenerator.randomPercentageSuccess(action.successPercentage)
      : true;
    if (isActionSuccessful) {
      this._applyActionSuccessfulResult(action);
    } else {
      this._applyActionUnsuccessfulResult(action);
    }
  }

  private _applyActionSuccessfulResult(action: Action) {
    this._consumeRessources(action?.successfulResult);
  }

  private _applyActionUnsuccessfulResult(action: Action) {
    this._consumeRessources(action?.unsuccessfulResult);
  }

  private _consumeRessources(
    actionResult?: Ressources,
    transform = (value: number) => value
  ) {
    actionResult?.foos &&
      this.store.setFoosAmount(
        this.store.getFoosAmount() + transform(actionResult.foos)
      );
    actionResult?.bars &&
      this.store.setBarsAmount(
        this.store.getBarsAmount() + transform(actionResult.bars)
      );
    actionResult?.foobars &&
      this.store.setFoobarsAmount(
        this.store.getFoobarsAmount() + transform(actionResult.foobars)
      );
    actionResult?.robots && this._addRobots(transform(actionResult.robots));
  }

  private _addRobots(amount: number) {
    // currently robots can only be added, a negative amount will do nothing
    for (let i = 0; i < amount; i++) {
      new Robot(this.store);
    }
  }

  /**
   * Starts moving if the robot isn't doing anything and the next location
   * has been specified.
   */
  startMoving(currentTime: number) {
    this._checksForStartingMove();
    this.setLocation(Location.TRANSITION);
    this.setAction(MOVING);
    this.actionStartTime = currentTime;
  }

  private _checksForStartingMove() {
    this._checkAvailable();
    this._checkLocationSpecified();
    this._checkNotKeepingLocation();
  }

  private _checkNotKeepingLocation() {
    if (this.getKeepLocation()) {
      throw new Error(
        "The robot can't start moving while it has been asked to keep its location."
      );
    }
  }

  /**
   * Starts an action on the current location if the robot isn't doing anything.
   */
  startLocationRelatedAction(currentTime: number) {
    const action = this._checksForLocationRelatedAction();
    this._consumeNeededRessources(action);
    this.setAction(action);
    this.actionStartTime = currentTime;
  }

  private _checksForLocationRelatedAction(): Action {
    this._checkAvailable();
    const action = this._checkLocationForAction();
    if (action.neededressources) {
      this._checkRessources(action.neededressources);
    }
    return action;
  }

  private _checkAvailable() {
    if (!this.isAvailable()) {
      throw new Error(`The robot is not available yet`);
    }
  }

  private _checkLocationForAction(): Action {
    let action;
    switch (this.location) {
      case Location.FOO_MINE:
        action = MINING_FOO;
        break;
      case Location.BAR_MINE:
        action = MINING_BAR;
        break;
      case Location.ASSEMBLING_FACTORY:
        action = ASSEMBLING;
        break;
      case Location.SHOP:
        action = BUYING_ROBOT;
        break;
      default:
        throw new Error(
          `The current location (${this.location}) does not allow location related actions.`
        );
    }
    return action;
  }

  private _checkRessources(neededRessources: NeededRessources) {
    const enoughFoos = neededRessources?.foos
      ? this.store.getFoosAmount() >= neededRessources.foos
      : true;
    const enoughBars = neededRessources?.bars
      ? this.store.getBarsAmount() >= neededRessources.bars
      : true;
    const enoughFoobars = neededRessources?.foobars
      ? this.store.getFoobarsAmount() >= neededRessources.foobars
      : true;
    const enoughRobots = neededRessources?.robots
      ? this.store.getRobots().length >= neededRessources.robots
      : true;
    const enoughRessources =
      enoughFoos && enoughBars && enoughFoobars && enoughRobots;
    if (!enoughRessources) {
      throw new Error(
        `${neededRessources.errorMessage}.
        There are only ${this.store.getFoosAmount()} foos,
        ${this.store.getBarsAmount()} bars,
        ${this.store.getFoobarsAmount()} foobars 
        and ${this.store.getRobots().length} robots.`
      );
    }
  }

  private _consumeNeededRessources(action: Action) {
    this._consumeRessources(action?.neededressources, (value) => -value);
  }

  subscribe(information: ObservedRobot, callback: Function) {
    this.observable.subscribe(information, callback);
  }

  canAssemble(): boolean {
    return this._canDoAction(ASSEMBLING.neededressources);
  }

  canBuyRobot(): boolean {
    return this._canDoAction(BUYING_ROBOT.neededressources);
  }

  private _canDoAction(neededRessources?: NeededRessources) {
    try {
      neededRessources && this._checkRessources(neededRessources);
    } catch {
      return false;
    }
    return true;
  }

  /**
   * State the availability of the robot. A new action can't be started
   * without the robot being available.
   */
  isAvailable(): boolean {
    return this.action === WAITING;
  }

  /**
   * Set the next location where starting to move will lead.
   * A movement can't be started without that location set.
   */
  setNextLocation(location: Location | null) {
    this.nextLocation = location;
    const nextLocations: (Location | null)[] = [];
    this.store.getRobots().forEach((robot) => {
      nextLocations.push(robot.getNextLocation());
    });
    this.observable.trigger(ObservedRobot.ROBOT_NEXT_LOCATION, nextLocations);
  }

  getNextLocation(): Location | null {
    return this.nextLocation;
  }

  setLocation(location: Location) {
    this.location = location;
    const locations: Location[] = [];
    this.store.getRobots().forEach((robot) => {
      locations.push(robot.getLocation());
    });
    this.observable.trigger(ObservedRobot.ROBOT_LOCATION, locations);
  }

  getLocation() {
    return this.location;
  }

  setAction(action: Action) {
    this.previousAction = this.action;
    this.action = action;
  }

  getPreviousAction() {
    return this.previousAction;
  }

  setKeepLocation(keepLocation: boolean) {
    this.keepLocation = keepLocation;
  }

  getKeepLocation() {
    return this.keepLocation;
  }
}

export { Robot, Location, ObservedRobot };
