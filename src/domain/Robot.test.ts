import { FailureGenerator, SuccessGenerator } from "./RandomGenerator";
import { Location, Robot } from "./Robot";
import { Store } from "./store";

describe("Robot actions", () => {
  describe("move", () => {
    it("moves to the next location  after the required time", () => {
      const robot = new Robot(new Store());
      robot.setNextLocation(Location.FOO_MINE);
      robot.startMoving(0);
      robot.tick(4999);
      expect(robot.getLocation()).toEqual(Location.TRANSITION);
      robot.tick(5000);
      expect(robot.getLocation()).toEqual(Location.FOO_MINE);
    });

    it(`throws an error when trying to start moving:
        - without next location defined
        - while the robot is not available`, () => {
      const robot = new Robot(new Store(), {});
      function moveNoLocation() {
        robot.startMoving(0);
      }
      expect(moveNoLocation).toThrowError(
        "The robot can't start moving without next location specified."
      );

      robot.setNextLocation(Location.FOO_MINE);
      robot.startMoving(0);
      robot.tick(100);
      robot.setNextLocation(Location.ASSEMBLING_FACTORY);
      function moveNotAvailable() {
        robot.startMoving(0);
      }
      expect(moveNotAvailable).toThrowError("The robot is not available yet");
    });
  });

  describe("mine", () => {
    it("mines after the required time when being on mine location", () => {
      let store = new Store();
      let robot = new Robot(store, { initialLocation: Location.FOO_MINE });
      robot.startMining(0);
      robot.tick(999);
      expect(store.foosAmount).toEqual(0);
      robot.tick(1000);
      expect(store.foosAmount).toEqual(1);
      store = new Store();
      robot = new Robot(store, { initialLocation: Location.BAR_MINE });
      robot.startMining(0);
      robot.tick(1999);
      expect(store.barsAmount).toEqual(0);
      robot.tick(2000);
      expect(store.barsAmount).toEqual(1);
    });

    it(`throws an error when trying to start mining:
        - somewhere else than a in a mine
        - while the robot is not available`, () => {
      const robot = new Robot(new Store(), {
        initialLocation: Location.ASSEMBLING_FACTORY,
      });
      function mineAndThrow() {
        robot.startMining(0);
      }
      expect(mineAndThrow).toThrowError("The robot has to be in a mine");

      robot.setNextLocation(Location.FOO_MINE);
      robot.startMoving(0);
      robot.tick(100);
      function mineNotAvailable() {
        robot.startMining(0);
      }
      expect(mineNotAvailable).toThrowError("The robot is not available yet");
    });
  });

  describe("assemble", () => {
    it(`creates a foobar after the required time, when on assembling factory,
    with enough foos and bars, in case of success.`, () => {
      const store = new Store();
      store.foosAmount = 1;
      store.barsAmount = 1;
      const robot = new Robot(store, {
        randomGenerator: new SuccessGenerator(),
        initialLocation: Location.ASSEMBLING_FACTORY,
      });
      robot.startAssembling(0);
      robot.tick(1999);
      expect(store.fooBarsAmount).toEqual(0);
      expect(store.barsAmount).toEqual(1);
      expect(store.foosAmount).toEqual(1);
      robot.tick(2000);
      expect(store.fooBarsAmount).toEqual(1);
      expect(store.barsAmount).toEqual(0);
      expect(store.foosAmount).toEqual(0);
    });

    it(`looses the foo and keeps the bar in case of failure`, () => {
      const store = new Store();
      store.foosAmount = 1;
      store.barsAmount = 1;
      const robot = new Robot(store, {
        randomGenerator: new FailureGenerator(),
        initialLocation: Location.ASSEMBLING_FACTORY,
      });
      robot.startAssembling(0);
      robot.tick(2000);
      expect(store.fooBarsAmount).toEqual(0);
      expect(store.barsAmount).toEqual(1);
      expect(store.foosAmount).toEqual(0);
    });

    it(`throws an error:
       - when trying to assemble somewhere else than in the assemble factory
       - without enough foos and bars
       - while the robot is not available`, () => {
      const store = new Store();
      store.foosAmount = 1;
      store.barsAmount = 1;
      let robot = new Robot(store, {
        randomGenerator: new SuccessGenerator(),
      });
      function assembleWrongLocation() {
        robot.startAssembling(0);
      }
      expect(assembleWrongLocation).toThrowError(
        "The robot has to be in the assembling factory"
      );

      robot = new Robot(store, {
        randomGenerator: new SuccessGenerator(),
        initialLocation: Location.ASSEMBLING_FACTORY,
      });
      store.foosAmount = 0;
      function assembleNotEnoughFoo() {
        robot.startAssembling(0);
      }
      expect(assembleNotEnoughFoo).toThrowError(
        "To create a foobar the robot needs one foo and one bar"
      );

      robot.setNextLocation(Location.FOO_MINE);
      robot.startMoving(0);
      robot.tick(100);
      function assembleNotAvailable() {
        robot.startAssembling(0);
      }
      expect(assembleNotAvailable).toThrowError(
        "The robot is not available yet"
      );
    });
  });

  describe("buy a robot", () => {
    it(`buys a new robot when on shop and with enough 
    foos and foobars`, () => {
      const store = new Store();
      store.foosAmount = 6;
      store.fooBarsAmount = 3;
      const robot = new Robot(store);
      robot.startBuyingRobot(0);
      robot.tick(0);
      expect(store.fooBarsAmount).toEqual(0);
      expect(store.foosAmount).toEqual(0);
      expect(store.robots).toHaveLength(2);
    });

    it(`throws an error:
        - when trying to buy a tobot somewhere else than in the shop
        - without enough foos and foobars
        - while the robot is not available`, () => {
      const store = new Store();
      store.foosAmount = 6;
      store.fooBarsAmount = 3;
      let robot = new Robot(store, {
        initialLocation: Location.ASSEMBLING_FACTORY,
      });
      function buyBadLocation() {
        robot.startBuyingRobot(0);
      }
      expect(buyBadLocation).toThrowError("The robot has to be in the shop");

      robot = new Robot(store);
      function buyNotEnoughFoo() {
        robot.startBuyingRobot(0);
      }
      store.foosAmount = 2;
      expect(buyNotEnoughFoo).toThrowError(
        "To buy a new robot, the robot needs 6 foos and 3 foobars"
      );

      robot.setNextLocation(Location.FOO_MINE);
      robot.startMoving(0);
      robot.tick(100);
      function buyNotAvailable() {
        robot.startBuyingRobot(0);
      }
      expect(buyNotAvailable).toThrowError("The robot is not available yet");
    });
  });
});
