import { Robot } from "./Robot";
import { ObservedAmount, Store } from "./Store";

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
});
