import { Location, Robot } from "./Robot";
import { Store } from "./store";
import { BasicStrategy } from "./Strategy";

it(`starts moving robots that are availale and have
their next location set`, () => {
  const store = new Store();
  const robot = new Robot(store);
  const strategy = new BasicStrategy(store);
  robot.setNextLocation(Location.FOO_MINE);
  strategy.actOnOneFrame(0);
  expect(robot.getLocation()).toEqual(Location.TRANSITION);
});
