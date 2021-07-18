import { DateTime, RealDateTime } from "./DateTime";
import { Location, Robot } from "./Robot";
import { Store } from "./store";
import { BasicStrategy, Strategy } from "./Strategy";

const MAX_ROBOTS_LENGTH = 20;

type GameOptions = {
  dateTime?: DateTime;
};
class Game {
  public store: Store;
  private dateTime: DateTime;
  private strategy: Strategy;
  private started: boolean;

  constructor(strategy: Strategy, options?: GameOptions) {
    this.store = new Store();
    this.dateTime = options?.dateTime ? options.dateTime : new RealDateTime();
    this.strategy = strategy ? strategy : new BasicStrategy();
    new Robot(this.store);
    new Robot(this.store);
    this.started = false;
  }

  start() {
    this.started = true;
    let requestId = 0;
    const nextFrame = () => {
      const now = this.dateTime.getCurrentTime();
      this.strategy.actOnOneFrame(now, this.store);
      if (this.store.robots.length < MAX_ROBOTS_LENGTH) {
        requestId = requestAnimationFrame(nextFrame);
      } else {
        cancelAnimationFrame(requestId);
        this.started = false;
      }
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

  getStarted(): boolean {
    return this.started;
  }
}
export { Game };
