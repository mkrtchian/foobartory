import { DateTime, RealDateTime } from "./DateTime";
import { ObservedAmount, ObservedRobot } from "./Observable";
import { Location, Robot } from "./Robot";
import { Store } from "./Store";
import { Strategy } from "./Strategy";

const MAX_ROBOTS = 20;

type GameOptions = {
  dateTime?: DateTime;
};
class Game {
  public store: Store;
  private dateTime: DateTime;
  private started: boolean;
  private startTime: number | null;

  constructor(private strategy: Strategy, options?: GameOptions) {
    this.store = new Store();
    this.dateTime = options?.dateTime ? options.dateTime : new RealDateTime();
    new Robot(this.store);
    new Robot(this.store);
    this.started = false;
    this.startTime = null;
  }

  start() {
    this.started = true;
    this.startTime = this.dateTime.getCurrentTime();
    let requestId = 0;
    const nextFrame = () => {
      const now = this.dateTime.getCurrentTime();
      this.strategy.actOnOneFrame(now, this.store);
      if (this.started && this.store.getRobots().length < MAX_ROBOTS) {
        requestId = requestAnimationFrame(nextFrame);
      } else {
        cancelAnimationFrame(requestId);
        this.started = false;
        this.startTime = null;
      }
    };
    nextFrame();
  }

  stop() {
    this.started = false;
    this.startTime = null;
  }

  getStartTime() {
    return this.startTime;
  }

  getStarted(): boolean {
    return this.started;
  }

  getCurrentTime() {
    if (this.started) {
      return this.dateTime.getCurrentTime();
    } else {
      throw new Error("The game is not started");
    }
  }

  getStrategy(): Strategy {
    return this.strategy;
  }

  setRobotNextLocation(id: number, location: Location) {
    this.store.getRobots()[id].setNextLocation(location);
  }

  getRobotLocation(id: number): Location {
    return this.store.getRobots()[id].getLocation();
  }

  subscribeToAmount(information: ObservedAmount, callback: Function) {
    this.store.subscribe(information, callback);
  }

  subscribeToRobots(information: ObservedRobot, callback: Function) {
    this.store.subscribeToRobots(information, callback);
  }
}
export { Game, MAX_ROBOTS };
