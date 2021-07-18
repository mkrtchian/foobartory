import {
  FailureGenerator,
  RealRandomGenerator,
  SuccessGenerator,
} from "./RandomGenerator";
import { Location, Robot } from "./Robot";
import { Store } from "./store";
import { BasicStrategy } from "./Strategy";

let store: Store;
let robot: Robot;
let strategy: BasicStrategy;

beforeEach(() => {
  store = new Store();
  robot = new Robot(store);
  strategy = new BasicStrategy({ randomGenerator: new SuccessGenerator() });
});

describe("Manual next move", () => {
  it(`starts moving robots that are available and have 
    their next location set`, () => {
    robot.setNextLocation(Location.FOO_MINE);
    strategy.actOnOneFrame(0, store);
    expect(robot.getLocation()).toEqual(Location.TRANSITION);
  });

  it(`does not start moving robots that are available and have their 
  next location set but that are asked to keep their location`, () => {
    robot.setNextLocation(Location.FOO_MINE);
    robot.setKeepLocation(true);
    strategy.actOnOneFrame(0, store);
    expect(robot.getLocation()).toEqual(Location.SHOP);
    robot.setKeepLocation(false);
    strategy.actOnOneFrame(1, store);
    expect(robot.getLocation()).toEqual(Location.TRANSITION);
  });
});

describe("Automatic behavior (no manual next move)", () => {
  describe("Moving", () => {
    it(`starts moving robot that is available, when the random generator 
    tells to do so`, () => {
      strategy.actOnOneFrame(0, store);
      expect(robot.getLocation()).toEqual(Location.TRANSITION);
    });

    it(`the decision to move by the dandom generator is influenced by the 
    chosen movement probability`, () => {
      strategy = new BasicStrategy({
        randomGenerator: new RealRandomGenerator(),
      });
      strategy.setAutomaticMovementProbability(0);
      strategy.actOnOneFrame(0, store);
      expect(robot.getLocation()).toEqual(Location.SHOP);
    });

    it(`does not start moving robot that is available, when the random 
    generator tells to not move`, () => {
      strategy = new BasicStrategy({ randomGenerator: new FailureGenerator() });
      strategy.actOnOneFrame(0, store);
      expect(robot.getLocation()).toEqual(Location.SHOP);
    });

    it(`does not start moving robot that is available, if it is asked to keep 
    its location`, () => {
      robot.setKeepLocation(true);
      strategy.actOnOneFrame(0, store);
      expect(robot.getLocation()).toEqual(Location.SHOP);
      robot.setKeepLocation(false);
      strategy.actOnOneFrame(1, store);
      expect(robot.getLocation()).toEqual(Location.TRANSITION);
    });

    it(`when decided to move, it moves robot to a specific direction influenced by
    the chosen location weights`, () => {
      strategy = new BasicStrategy({
        randomGenerator: new RealRandomGenerator(),
      });
      strategy.setAutomaticMovementProbability(100);
      strategy.setLocationWeight(Location.FOO_MINE, 0);
      strategy.setLocationWeight(Location.BAR_MINE, 1);
      strategy.setLocationWeight(Location.ASSEMBLING_FACTORY, 0);
      strategy.setLocationWeight(Location.SHOP, 0);
      strategy.actOnOneFrame(0, store);
      robot.setKeepLocation(true);
      strategy.actOnOneFrame(5000, store);
      expect(robot.getLocation()).toEqual(Location.BAR_MINE);
    });

    it(`does not move the robot if the chosen weights are all 0`, () => {
      strategy = new BasicStrategy({
        randomGenerator: new RealRandomGenerator(),
      });
      strategy.setAutomaticMovementProbability(100);
      strategy.setLocationWeight(Location.FOO_MINE, 0);
      strategy.setLocationWeight(Location.BAR_MINE, 0);
      strategy.setLocationWeight(Location.ASSEMBLING_FACTORY, 0);
      strategy.setLocationWeight(Location.SHOP, 0);
      strategy.actOnOneFrame(0, store);
      strategy.actOnOneFrame(5000, store);
      expect(robot.getLocation()).toEqual(Location.SHOP);
    });
  });

  describe("Mining", () => {
    it(`starts mining for available robot, when the random generator tells not 
    to move, and when in a mine location`, () => {
      store = new Store();
      robot = new Robot(store, { initialLocation: Location.FOO_MINE });
      strategy = new BasicStrategy({ randomGenerator: new FailureGenerator() });
      strategy.actOnOneFrame(0, store);
      robot.setKeepLocation(true);
      strategy.actOnOneFrame(1000, store);
      expect(store.foosAmount).toEqual(1);
      strategy.actOnOneFrame(2000, store);
      expect(store.foosAmount).toEqual(2);
    });
  });

  describe("Assembling", () => {
    it(`starts assembling for available robot, when the random generator tells not 
    to move, and when in the assembling factory with enough ressources`, () => {
      store = new Store();
      store.foosAmount = 2;
      store.barsAmount = 2;
      robot = new Robot(store, {
        initialLocation: Location.ASSEMBLING_FACTORY,
        randomGenerator: new SuccessGenerator(),
      });
      strategy = new BasicStrategy({ randomGenerator: new FailureGenerator() });
      strategy.actOnOneFrame(0, store);
      robot.setKeepLocation(true);
      strategy.actOnOneFrame(2000, store);
      expect(store.fooBarsAmount).toEqual(1);
      strategy.actOnOneFrame(4000, store);
      expect(store.fooBarsAmount).toEqual(2);
      strategy.actOnOneFrame(6000, store);
      expect(store.fooBarsAmount).toEqual(2);
    });
  });

  describe("Buying", () => {
    it(`starts buying for available robot, when the random generator tells not 
    to move, and when in the shop with enough ressources`, () => {
      store = new Store();
      store.foosAmount = 12;
      store.fooBarsAmount = 6;
      robot = new Robot(store);
      strategy = new BasicStrategy({ randomGenerator: new FailureGenerator() });
      strategy.actOnOneFrame(0, store);
      robot.setKeepLocation(true);
      strategy.actOnOneFrame(0, store);
      expect(store.robots.length).toEqual(2);
      strategy.actOnOneFrame(0, store);
      expect(store.robots.length).toEqual(3);
      strategy.actOnOneFrame(0, store);
      expect(store.robots.length).toEqual(3);
    });
  });
});
