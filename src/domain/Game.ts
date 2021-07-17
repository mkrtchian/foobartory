import { DateTime, RealDateTime } from "./DateTime";
import { Location, Robot } from "./Robot";
import { Store } from "./store";
import { BasicStrategy, Strategy } from "./Strategy";

class Game {
  private store: Store;
  private dateTime: DateTime;
  private strategy: Strategy;

  constructor(dateTime?: DateTime, strategy?: Strategy) {
    this.store = new Store();
    this.dateTime = dateTime ? dateTime : new RealDateTime();
    this.strategy = strategy ? strategy : new BasicStrategy(this.store);
    new Robot(this.store);
    new Robot(this.store);
  }

  start() {
    const strategy = this.strategy;
    const dateTime = this.dateTime;
    function nextFrame() {
      const now = dateTime.getCurrentTime();
      strategy.actOnOneFrame(now);
      requestAnimationFrame(nextFrame);
    }
    nextFrame();
  }

  setRobotNextLocation(id: number, location: Location) {
    this.store.robots[id].setNextLocation(location);
  }

  getRobotLocation(id: number): Location {
    return this.store.robots[id].getLocation();
  }
}
export { Game };
