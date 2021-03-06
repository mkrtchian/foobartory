import { MOVING, WAITING } from "./actions";
import Location from "./locations";
import { RandomGenerator, RealRandomGenerator } from "./RandomGenerator";
import { Robot } from "./Robot";
import { Store } from "./Store";

const INITIAL_MOVEMENT_PROBABILITY = 50;
const INITIAL_WEIGHTS = {
  fooMine: 50,
  barMine: 50,
  assemblingFactory: 50,
  shop: 50,
} as const;

interface Strategy {
  actOnOneFrame(currentTime: number, store: Store): void;
}

type BasicStrategyOptions = {
  randomGenerator?: RandomGenerator;
};

/**
 * Implements a basic strategy:
 * With a manual part taking priority:
 * - does not move robots that have been manually told to keep location.
 * - moves robots to the indicated manual location if there is one.
 * And an automatic part:
 * - chooses randomly to make an available robot move to a random
 *   location, or instead do an action if possible.
 * - the random aspect of moving or not, and where to move can be
 *   influenced manually.
 */
class BasicStrategy implements Strategy {
  private randomGenerator: RandomGenerator;
  private automaticMovementProbability: number;
  private automaticLocationWeights: Map<Location, number>;

  constructor(options?: BasicStrategyOptions) {
    this.randomGenerator = options?.randomGenerator
      ? options.randomGenerator
      : new RealRandomGenerator();
    this.automaticMovementProbability = INITIAL_MOVEMENT_PROBABILITY;
    this.automaticLocationWeights = new Map([
      [Location.FOO_MINE, INITIAL_WEIGHTS.fooMine],
      [Location.BAR_MINE, INITIAL_WEIGHTS.barMine],
      [Location.ASSEMBLING_FACTORY, INITIAL_WEIGHTS.assemblingFactory],
      [Location.SHOP, INITIAL_WEIGHTS.shop],
    ]);
  }

  /**
   * This influences the probability to choose automatically one
   * location instead of another.
   * @param location the location to influence.
   * @param weight the heigher the value relatively to others, the
   *   more chances to go there.
   */
  setLocationWeight(location: Location, weight: number) {
    if (weight < 0) {
      throw new Error(
        `The assigned weight ${weight} has to be greater than 0.`
      );
    }
    this.automaticLocationWeights.set(location, weight);
  }

  getLocationWeight(location: Location) {
    return this.automaticLocationWeights.get(location);
  }

  /**
   * The percentage of chances to get an automatic move each time.
   */
  setAutomaticMovementProbability(probability: number) {
    this.automaticMovementProbability = probability;
  }

  getAutomaticMovementProbability() {
    return this.automaticMovementProbability;
  }

  /**
   * Do some action on the content of the store, including robots.
   * This function is called by the game several times per second.
   * @param currentTime the time where the function is called.
   */
  actOnOneFrame(currentTime: number, store: Store) {
    store.getRobots().forEach((robot) => {
      robot.tick(currentTime);
      if (robot.isAvailable()) {
        const shouldDoManualMove =
          robot.getNextLocation() && !robot.getKeepLocation();
        if (shouldDoManualMove) {
          robot.startMoving(currentTime);
        } else {
          this._handleAutomaticActions(robot, currentTime);
        }
      }
    });
  }

  private _handleAutomaticActions(robot: Robot, currentTime: number) {
    const hasJustMoved = robot.getPreviousAction() === MOVING;
    const shouldAutomaticallyMove =
      this.randomGenerator.randomPercentageSuccess(
        this.automaticMovementProbability
      ) &&
      !robot.getKeepLocation() &&
      !hasJustMoved;
    if (shouldAutomaticallyMove) {
      this._doAutomaticMove(robot, currentTime);
    } else {
      this._doAutomaticOtherActions(robot, currentTime);
    }
  }

  private _doAutomaticMove(robot: Robot, currentTime: number) {
    const possibleLocations = new Map(this.automaticLocationWeights);
    possibleLocations.delete(robot.getLocation());
    try {
      const chosenLocation =
        this.randomGenerator.chooseValue(possibleLocations);
      robot.setNextLocation(chosenLocation);
      robot.startMoving(currentTime);
    } catch (exception: unknown) {
      if (
        exception instanceof Error &&
        exception.message.includes("At least one of the weights has to be > 0")
      ) {
        // in case of wrong weights (eg. (0, 0, 0)), we just don't move
      } else {
        throw exception;
      }
    }
  }

  private _doAutomaticOtherActions(robot: Robot, currentTime: number) {
    switch (robot.getLocation()) {
      case Location.FOO_MINE:
      case Location.BAR_MINE:
        robot.startLocationRelatedAction(currentTime);
        break;
      case Location.ASSEMBLING_FACTORY:
        if (robot.canAssemble()) {
          robot.startLocationRelatedAction(currentTime);
        } else {
          robot.setAction(WAITING);
          robot.setLocation(robot.getLocation());
        }
        break;
      case Location.SHOP:
        if (robot.canBuyRobot()) {
          robot.startLocationRelatedAction(currentTime);
        } else {
          robot.setAction(WAITING);
          robot.setLocation(robot.getLocation());
        }
        break;
      default:
        throw new Error(
          `An action has been requested while the robot was the wrong location (${robot.getLocation()}).`
        );
    }
  }
}

export { BasicStrategy, INITIAL_MOVEMENT_PROBABILITY, INITIAL_WEIGHTS };
export type { Strategy };
