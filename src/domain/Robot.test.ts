import { FailureGenerator, SuccessGenerator } from "./RandomGenerator";
import { Location, Robot } from "./Robot";
import { Store } from "./store";

describe("Robot actions", () => {
  it("moves to the indicated location", () => {
    const robot = new Robot(new Store());
    robot.moveTo(Location.FOO_MINE);
    expect(robot.getLocation()).toEqual(Location.FOO_MINE);
  });

  describe("mine", () => {
    it("mines when being on mine location", () => {
      const store = new Store();
      const robot = new Robot(store);
      robot.moveTo(Location.FOO_MINE);
      robot.mine();
      expect(store.foosAmount).toEqual(1);
      robot.moveTo(Location.BAR_MINE);
      robot.mine();
      expect(store.barsAmount).toEqual(1);
    });

    it(`throws an error when trying to mine somewhere else than a in 
    a mine`, () => {
      const robot = new Robot(new Store());
      robot.moveTo(Location.ASSEMBLING_FACTORY);
      function mineAndThrow() {
        robot.mine();
      }
      expect(mineAndThrow).toThrowError("The robot has to be in a mine");
    });
  });

  describe("assemble", () => {
    it(`creates a foobar when on assembling factory, with 
    enough foos and bars, in case of success.`, () => {
      const store = new Store();
      store.foosAmount = 1;
      store.barsAmount = 1;
      const robot = new Robot(store, {
        randomGenerator: new SuccessGenerator(),
      });
      robot.moveTo(Location.ASSEMBLING_FACTORY);
      robot.assemble();
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
      });
      robot.moveTo(Location.ASSEMBLING_FACTORY);
      robot.assemble();
      expect(store.fooBarsAmount).toEqual(0);
      expect(store.barsAmount).toEqual(1);
      expect(store.foosAmount).toEqual(0);
    });

    it(`throws an error when trying to assemble somewhere else than in
    the assemble factory, or without enough foos and bars`, () => {
      const store = new Store();
      store.foosAmount = 1;
      store.barsAmount = 1;
      const robot = new Robot(store, {
        randomGenerator: new SuccessGenerator(),
      });
      function assembleAndThrow() {
        robot.assemble();
      }
      robot.moveTo(Location.FOO_MINE);
      expect(assembleAndThrow).toThrowError(
        "The robot has to be in the assembling factory"
      );
      robot.moveTo(Location.ASSEMBLING_FACTORY);
      store.foosAmount = 0;
      expect(assembleAndThrow).toThrowError(
        "To create a foobar the robot needs one foo and one bar"
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
      robot.buyRobot();
      expect(store.fooBarsAmount).toEqual(0);
      expect(store.foosAmount).toEqual(0);
      expect(store.robots).toHaveLength(2);
    });

    it(`throws an error when trying to buy a tobot somewhere else
    than in the shop, or without enough foos and foobars`, () => {
      const store = new Store();
      store.foosAmount = 6;
      store.fooBarsAmount = 3;
      const robot = new Robot(store);
      function buyAndThrow() {
        robot.buyRobot();
      }
      robot.moveTo(Location.FOO_MINE);
      expect(buyAndThrow).toThrowError("The robot has to be in the shop");
      robot.moveTo(Location.SHOP);
      store.foosAmount = 2;
      expect(buyAndThrow).toThrowError(
        "To buy a new robot, the robot needs 6 foos and 3 foobars"
      );
    });
  });
});
