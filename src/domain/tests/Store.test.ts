import { Location, Robot } from "../Robot";
import { ObservedAmount, ObservedRobot, Store } from "../Store";

describe("Observing", () => {
  let store: Store;
  let observerFunction: Function;

  beforeEach(() => {
    store = new Store();
    observerFunction = jest.fn();
  });

  it("observes correctly foosAmount", () => {
    store.subscribe(ObservedAmount.FOOS_AMOUNT, observerFunction);
    store.setFoosAmount(3);
    expect(observerFunction).toHaveBeenCalledWith(3);
  });

  it("observes correctly barsAmount", () => {
    store.subscribe(ObservedAmount.BARS_AMOUNT, observerFunction);
    store.setBarsAmount(3);
    expect(observerFunction).toHaveBeenCalledWith(3);
  });

  it("observes correctly foobarsAmount", () => {
    store.subscribe(ObservedAmount.FOOBARS_AMOUNT, observerFunction);
    store.setFoobarsAmount(3);
    expect(observerFunction).toHaveBeenCalledWith(3);
  });

  it("observes correctly robots amount", () => {
    store.subscribe(ObservedAmount.ROBOTS_AMOUNT, observerFunction);
    new Robot(store);
    expect(observerFunction).toHaveBeenCalledWith(1);
    new Robot(store);
    expect(observerFunction).toHaveBeenCalledWith(2);
  });

  it("observes correctly robots locations", () => {
    let observerFunction = jest.fn();
    const robot1 = new Robot(store);
    new Robot(store);
    store.subscribeToRobots(ObservedRobot.ROBOT_LOCATION, observerFunction);
    robot1.setNextLocation(Location.FOO_MINE);
    robot1.startMoving(0);
    robot1.tick(5000);
    expect(observerFunction).toHaveBeenCalledWith([
      Location.FOO_MINE,
      Location.SHOP,
    ]);
  });

  it("observes correctly robots next locations", () => {
    let observerFunction = jest.fn();
    const robot1 = new Robot(store);
    new Robot(store);
    store.subscribeToRobots(
      ObservedRobot.ROBOT_NEXT_LOCATION,
      observerFunction
    );
    robot1.setNextLocation(Location.FOO_MINE);
    expect(observerFunction).toHaveBeenCalledWith([Location.FOO_MINE, null]);
    robot1.startMoving(0);
    robot1.tick(5000);
    expect(observerFunction).toHaveBeenCalledWith([null, null]);
  });
});
