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

  it("observes correctly robots amounts", () => {
    let observerFunction = jest.fn();
    const robot1 = new Robot(store);
    const robot2 = new Robot(store);
    store.subscribeToRobots(ObservedRobot.ROBOT_LOCATION, observerFunction);
    robot1.setLocation(Location.FOO_MINE);
    expect(observerFunction).toHaveBeenCalledWith([
      Location.FOO_MINE,
      Location.SHOP,
    ]);
    robot2.setLocation(Location.ASSEMBLING_FACTORY);
    expect(observerFunction).toHaveBeenCalledWith([
      Location.FOO_MINE,
      Location.ASSEMBLING_FACTORY,
    ]);
  });
});
