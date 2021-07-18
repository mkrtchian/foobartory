import { DateTime, RealDateTime } from "./DateTime";
import { Location, Robot } from "./Robot";
import { Store } from "./store";
import { BasicStrategy, Strategy } from "./Strategy";

type GameOptions = {
  dateTime?: DateTime;
};
class Game {
  private store: Store;
  private dateTime: DateTime;
  private strategy: Strategy;

  constructor(strategy: Strategy, options?: GameOptions) {
    this.store = new Store();
    this.dateTime = options?.dateTime ? options.dateTime : new RealDateTime();
    this.strategy = strategy ? strategy : new BasicStrategy();
    new Robot(this.store);
    new Robot(this.store);
  }

  start() {
    const nextFrame = () => {
      const now = this.dateTime.getCurrentTime();
      this.strategy.actOnOneFrame(now, this.store);
      requestAnimationFrame(nextFrame);
    };
    nextFrame();
  }

  setRobotNextLocation(id: number, location: Location) {
    this.store.robots[id].setNextLocation(location);
  }

  getRobotLocation(id: number): Location {
    return this.store.robots[id].getLocation();
  }

  getStrategy(): Strategy {
    return this.strategy;
  }
}
export { Game };
