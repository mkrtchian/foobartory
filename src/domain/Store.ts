import {
  ObservableRobot,
  ObservableStore,
  ObservedAmount,
  ObservedRobot,
} from "./Observable";
import { Robot } from "./Robot";

class Store {
  private foosAmount: number;
  private barsAmount: number;
  private fooBarsAmount: number;
  private robots: Robot[];
  private observable: ObservableStore;
  private robotsObservable: ObservableRobot;

  constructor() {
    this.observable = new ObservableStore();
    this.robotsObservable = new ObservableRobot();
    this.foosAmount = 0;
    this.barsAmount = 0;
    this.fooBarsAmount = 0;
    this.robots = [];
  }

  subscribe(information: ObservedAmount, callback: Function) {
    this.observable.subscribe(information, callback);
  }

  subscribeToRobots(information: ObservedRobot, callback: Function) {
    this.robotsObservable.subscribe(information, callback);
  }

  setFoosAmount(amount: number) {
    this.foosAmount = amount;
    this.observable.trigger(ObservedAmount.FOOS_AMOUNT, this.foosAmount);
  }

  getFoosAmount() {
    return this.foosAmount;
  }

  setBarsAmount(amount: number) {
    this.barsAmount = amount;
    this.observable.trigger(ObservedAmount.BARS_AMOUNT, this.barsAmount);
  }

  getBarsAmount() {
    return this.barsAmount;
  }

  setFoobarsAmount(amount: number) {
    this.fooBarsAmount = amount;
    this.observable.trigger(ObservedAmount.FOOBARS_AMOUNT, this.fooBarsAmount);
  }

  getFoobarsAmount() {
    return this.fooBarsAmount;
  }

  addRobot(robot: Robot) {
    this.robots.push(robot);
    this.observable.trigger(ObservedAmount.ROBOTS_AMOUNT, this.robots.length);
  }

  getRobots() {
    return this.robots;
  }

  getRobotsObservable() {
    return this.robotsObservable;
  }
}

export { Store, ObservedAmount, ObservedRobot };
