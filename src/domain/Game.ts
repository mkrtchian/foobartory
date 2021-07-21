import { DateTime, RealDateTime } from "./DateTime";
import { ObservedAmount, ObservedRobot } from "./Observable";
import { Location, Robot } from "./Robot";
import { Store } from "./Store";
import { BasicStrategy, Strategy } from "./Strategy";

const MAX_ROBOTS = 20;

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
      if (this.store.getRobots().length < MAX_ROBOTS) {
        requestId = requestAnimationFrame(nextFrame);
      } else {
        cancelAnimationFrame(requestId);
        this.started = false;
      }
    };
    nextFrame();
  }

  setRobotNextLocation(id: number, location: Location) {
    this.store.getRobots()[id].setNextLocation(location);
  }

  getRobotLocation(id: number): Location {
    return this.store.getRobots()[id].getLocation();
  }

  getStrategy(): Strategy {
    return this.strategy;
  }

  getStarted(): boolean {
    return this.started;
  }

  subscribeToAmount(information: ObservedAmount, callback: Function) {
    this.store.subscribe(information, callback);
  }

  subscribeToRobots(information: ObservedRobot, callback: Function) {
    this.store.subscribeToRobots(information, callback);
  }
}
export { Game, MAX_ROBOTS };
