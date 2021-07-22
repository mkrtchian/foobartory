class Observable<Observed> {
  constructor(protected callbacks: Map<Observed, Function[]> = new Map()) {}

  subscribe(information: Observed, callback: Function) {
    this.callbacks.get(information)?.push(callback);
  }

  trigger<T>(information: Observed, value: T) {
    const callbacks = this.callbacks.get(information);
    if (callbacks) {
      callbacks.forEach(function callObservers(callback) {
        callback(value);
      });
    }
  }
}

enum ObservedRobot {
  ROBOT_LOCATION,
  ROBOT_NEXT_LOCATION,
}

class ObservableRobot extends Observable<ObservedRobot> {
  constructor() {
    super();
    this.callbacks.set(ObservedRobot.ROBOT_LOCATION, []);
    this.callbacks.set(ObservedRobot.ROBOT_NEXT_LOCATION, []);
  }
}

enum ObservedAmount {
  FOOS_AMOUNT,
  BARS_AMOUNT,
  FOOBARS_AMOUNT,
  ROBOTS_AMOUNT,
}

class ObservableStore extends Observable<ObservedAmount> {
  constructor() {
    super();
    this.callbacks.set(ObservedAmount.FOOS_AMOUNT, []);
    this.callbacks.set(ObservedAmount.BARS_AMOUNT, []);
    this.callbacks.set(ObservedAmount.FOOBARS_AMOUNT, []);
    this.callbacks.set(ObservedAmount.ROBOTS_AMOUNT, []);
  }
}

export {
  Observable,
  ObservableRobot,
  ObservedRobot,
  ObservableStore,
  ObservedAmount,
};
