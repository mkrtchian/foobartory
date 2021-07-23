import {
  Action,
  ASSEMBLING,
  ASSEMBLING_NEEDED_RESSOURCES,
  BUYING_ROBOT,
  BUYING_ROBOT_NEEDED_RESSOURCES,
  MINING_BAR,
  MINING_FOO,
  MOVING,
  NeededRessources,
  WAITING,
} from "./actions";
import { ObservableRobot, ObservedRobot } from "./Observable";
import { RandomGenerator, RealRandomGenerator } from "./RandomGenerator";
import { Store } from "./Store";

enum Location {
  FOO_MINE = "foo mine",
  BAR_MINE = "bar mine",
  ASSEMBLING_FACTORY = "assembling factory",
  SHOP = "shop",
  TRANSITION = "transition",
}

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
  private previousLocation: Location;
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
    this.previousLocation = Location.SHOP;
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
      const actionCurrentDuration = currentTime - this.actionStartTime;
      let actionTotalDuration: number;
      if ("randomBetween" in this.action) {
        actionTotalDuration = this.randomGenerator.randomBetweenTwoValues(
          ...this.action.randomBetween
        );
      } else {
        actionTotalDuration = this.action.totalDuration;
      }
      if (actionCurrentDuration >= actionTotalDuration) {
        this._endAction();
      }
    }
  }

  _endAction() {
    switch (this.action.actionType) {
      case MOVING.actionType: {
        if (this.nextLocation) {
          this._moveTo(this.nextLocation);
        } else {
          throw new Error(
            "The robot can't end its move without a location specified."
          );
        }
        break;
      }
      case MINING_FOO.actionType: {
        this._mineFoo();
        break;
      }
      case MINING_BAR.actionType: {
        this._mineBar();
        break;
      }
      case ASSEMBLING.actionType: {
        this._assemble();
        break;
      }
      case BUYING_ROBOT.actionType: {
        this._buyRobot();
        break;
      }
      default: {
        throw new Error(
          `There is a start time defined for an action, but the action of the robot is incorrect (${this.action.actionType}).`
        );
      }
    }
    this.setAction(WAITING);
    this.actionStartTime = null;
  }

  private _moveTo(location: Location) {
    this.setLocation(location);
    this.setNextLocation(null);
  }

  private _mineFoo() {
    this.store.setFoosAmount(this.store.getFoosAmount() + 1);
  }

  private _mineBar() {
    this.store.setBarsAmount(this.store.getBarsAmount() + 1);
  }

  private _assemble() {
    const isAssemblingSuccessful =
      this.randomGenerator.randomPercentageSuccess(60);
    if (isAssemblingSuccessful) {
      this.store.setFoobarsAmount(this.store.getFoobarsAmount() + 1);
    } else {
      this.store.setBarsAmount(this.store.getBarsAmount() + 1);
    }
  }

  private _buyRobot() {
    new Robot(this.store);
  }

  startMoving(currentTime: number) {
    this.checkAvailable();
    this._checkLocationSpecified();
    this._checkNotKeepingLocation();
    this.setLocation(Location.TRANSITION);
    this.setAction(MOVING);
    this.actionStartTime = currentTime;
  }

  startMining(currentTime: number) {
    this.checkAvailable();
    if (this.location === Location.FOO_MINE) {
      this.setAction(MINING_FOO);
    } else if (this.location === Location.BAR_MINE) {
      this.setAction(MINING_BAR);
    } else {
      throw new Error(
        `The robot has to be in a mine to mine, here it is in ${this.location}.`
      );
    }
    this.actionStartTime = currentTime;
  }

  startAssembling(currentTime: number) {
    this.checkAvailable();
    this._checkLocation(Location.ASSEMBLING_FACTORY);
    this._checkRessources(
      "To create a foobar the robot needs one foo and one bar",
      ASSEMBLING_NEEDED_RESSOURCES
    );

    this.setAction(ASSEMBLING);
    this.actionStartTime = currentTime;
    this.store.setBarsAmount(this.store.getBarsAmount() - 1);
    this.store.setFoosAmount(this.store.getFoosAmount() - 1);
  }

  startBuyingRobot(currentTime: number) {
    this.checkAvailable();
    this._checkLocation(Location.SHOP);
    this._checkRessources(
      "To buy a new robot, the robot needs 6 foos and 3 foobars",
      BUYING_ROBOT_NEEDED_RESSOURCES
    );
    this.setAction(BUYING_ROBOT);
    this.actionStartTime = currentTime;
    this.store.setFoobarsAmount(this.store.getFoobarsAmount() - 3);
    this.store.setFoosAmount(this.store.getFoosAmount() - 6);
  }

  private _checkLocation(location: Location) {
    if (location !== this.location) {
      throw new Error(
        `The robot has to be in the ${location}, here it is in ${this.location}.`
      );
    }
  }

  private _checkLocationSpecified() {
    if (!this.getNextLocation()) {
      throw new Error(
        "The robot can't start moving without next location specified."
      );
    }
  }

  private _checkNotKeepingLocation() {
    if (this.getKeepLocation()) {
      throw new Error(
        "The robot can't start moving while it has been asked to keep its location."
      );
    }
  }

  private _checkRessources(
    errorMessageBeginning: string,
    neededRessources: NeededRessources
  ) {
    const enoughRessources =
      this.store.getFoobarsAmount() >= neededRessources.foobars &&
      this.store.getFoosAmount() >= neededRessources.foos &&
      this.store.getBarsAmount() >= neededRessources.bars;
    if (!enoughRessources) {
      throw new Error(
        `${errorMessageBeginning}.
        There are only ${this.store.getFoosAmount()} foos, ${this.store.getBarsAmount()} bars and ${this.store.getFoobarsAmount()} foobars.`
      );
    }
  }

  private checkAvailable() {
    if (!this.isAvailable()) {
      throw new Error(`The robot is not available yet`);
    }
  }

  canAssemble(): boolean {
    return this._canDoAction(ASSEMBLING_NEEDED_RESSOURCES);
  }

  canBuyRobot(): boolean {
    return this._canDoAction(BUYING_ROBOT_NEEDED_RESSOURCES);
  }

  private _canDoAction(neededRessources: NeededRessources) {
    try {
      this._checkRessources("", neededRessources);
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

  subscribe(information: ObservedRobot, callback: Function) {
    this.observable.subscribe(information, callback);
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

  getLocation() {
    return this.location;
  }

  setLocation(location: Location) {
    this.previousLocation = this.location;
    this.location = location;
    const locations: Location[] = [];
    this.store.getRobots().forEach((robot) => {
      locations.push(robot.getLocation());
    });
    this.observable.trigger(ObservedRobot.ROBOT_LOCATION, locations);
  }

  getAction() {
    return this.action;
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

  getPreviousLocation() {
    return this.previousLocation;
  }
}

export { Robot, Location, ObservedRobot };
