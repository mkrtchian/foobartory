import {
  Action,
  ASSEMBLING,
  BUYING,
  MINING_BAR,
  MINING_FOO,
  MOVING,
  WAITING,
} from "./actions";
import { RandomGenerator, RealRandomGenerator } from "./RandomGenerator";
import { Store } from "./store";

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
class Robot {
  private location: Location;
  private action: Action;
  private randomGenerator: RandomGenerator;
  private nextLocation: Location | null;
  private actionStartTime: number | null;

  constructor(private store: Store, options?: RobotOptions) {
    this.nextLocation = null;
    this.action = WAITING;
    this.actionStartTime = null;
    this.store.robots.push(this);
    this.location = options?.initialLocation
      ? options.initialLocation
      : Location.SHOP;
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
      const actionDuration = currentTime - this.actionStartTime;
      if (actionDuration >= this.action.getTotalDuration()) {
        this._endAction();
      }
    }
  }

  _endAction() {
    switch (this.action) {
      case MOVING: {
        if (this.nextLocation) {
          this._moveTo(this.nextLocation);
        } else {
          throw new Error(
            "The robot can't end its move without a location specified."
          );
        }
        break;
      }
      case MINING_FOO: {
        this._mineFoo();
        break;
      }
      case MINING_BAR: {
        this._mineBar();
        break;
      }
      case ASSEMBLING: {
        this._assemble();
        break;
      }
      case BUYING: {
        this._buyRobot();
        break;
      }
      default: {
        throw new Error(
          "There is a start time defined for an action, but the action of the robot is incorrect."
        );
      }
    }
    this.action = WAITING;
  }

  private _moveTo(location: Location) {
    this.location = location;
  }

  private _mineFoo() {
    this.store.foosAmount += 1;
  }

  private _mineBar() {
    this.store.barsAmount += 1;
  }

  private _assemble() {
    const isAssemblingSuccessful =
      this.randomGenerator.randomPercentageSuccess(60);
    if (isAssemblingSuccessful) {
      this.store.fooBarsAmount += 1;
      this.store.barsAmount -= 1;
      this.store.foosAmount -= 1;
    } else {
      this.store.foosAmount -= 1;
    }
  }

  private _buyRobot() {
    this.store.fooBarsAmount -= 3;
    this.store.foosAmount -= 6;
    new Robot(this.store);
  }

  startMoving(currentTime: number) {
    this.checkAvailable();
    if (!this.getNextLocation()) {
      throw new Error(
        "The robot can't start moving without next location specified."
      );
    }
    this.location = Location.TRANSITION;
    this.action = MOVING;
    this.actionStartTime = currentTime;
  }

  startMining(currentTime: number) {
    this.checkAvailable();
    if (this.location === Location.FOO_MINE) {
      this.action = MINING_FOO;
    } else if (this.location === Location.BAR_MINE) {
      this.action = MINING_BAR;
    } else {
      throw new Error(
        `The robot has to be in a mine to mine, here it is in ${this.location}.`
      );
    }
    this.actionStartTime = currentTime;
  }

  startAssembling(currentTime: number) {
    this.checkAvailable();
    this.checkLocation(Location.ASSEMBLING_FACTORY);
    this.checkRessources(
      "To create a foobar the robot needs one foo and one bar",
      1,
      1,
      0
    );
    this.action = ASSEMBLING;
    this.actionStartTime = currentTime;
  }

  startBuyingRobot(currentTime: number) {
    this.checkAvailable();
    this.checkLocation(Location.SHOP);
    this.checkRessources(
      "To buy a new robot, the robot needs 6 foos and 3 foobars",
      6,
      0,
      3
    );
    this.action = BUYING;
    this.actionStartTime = currentTime;
  }

  private checkLocation(location: Location) {
    if (location !== this.location) {
      throw new Error(
        `The robot has to be in the ${location}, here it is in ${this.location}.`
      );
    }
  }

  private checkRessources(
    errorMessageBeginning: string,
    neededFoos: number,
    neededBars: number,
    neededFoobars: number
  ) {
    const enoughRessources =
      this.store.fooBarsAmount >= neededFoobars &&
      this.store.foosAmount >= neededFoos &&
      this.store.barsAmount >= neededBars;
    if (!enoughRessources) {
      throw new Error(
        `${errorMessageBeginning}.
        There are only ${this.store.foosAmount} foos and ${this.store.fooBarsAmount} foobars.`
      );
    }
  }

  private checkAvailable() {
    if (!this.isAvailable()) {
      throw new Error(`The robot is not available yet`);
    }
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
  setNextLocation(location: Location) {
    this.nextLocation = location;
  }

  getNextLocation(): Location | null {
    return this.nextLocation;
  }

  getLocation() {
    return this.location;
  }

  getAction() {
    return this.action;
  }
}

export { Robot, Location };
