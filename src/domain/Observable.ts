enum ObservedRobot {
  ROBOT_LOCATION,
}

class ObservableRobot {
  private robotsCallbacks: Map<ObservedRobot, Function[][]>;

  constructor() {
    this.robotsCallbacks = new Map([[ObservedRobot.ROBOT_LOCATION, []]]);
  }

  subscribe(information: ObservedRobot, robotId: number, callback: Function) {}

  trigger(information: ObservedRobot, robotId: number, location: Location) {}
}

enum ObservedAmount {
  FOOS_AMOUNT,
  BARS_AMOUNT,
  FOOBARS_AMOUNT,
  ROBOTS_AMOUNT,
}

class ObservableStore {
  private amountCallbacks: Map<ObservedAmount, Function[]>;

  constructor() {
    this.amountCallbacks = new Map([
      [ObservedAmount.FOOS_AMOUNT, []],
      [ObservedAmount.BARS_AMOUNT, []],
      [ObservedAmount.FOOBARS_AMOUNT, []],
      [ObservedAmount.ROBOTS_AMOUNT, []],
    ]);
  }

  subscribe(information: ObservedAmount, callback: Function) {
    this.amountCallbacks.get(information)?.push(callback);
  }

  trigger(information: ObservedAmount, value: number) {
    const amountCallbacks = this.amountCallbacks.get(information);
    if (amountCallbacks) {
      amountCallbacks.forEach((callback) => callback(value));
    }
  }
}

export { ObservableRobot, ObservedRobot, ObservableStore, ObservedAmount };
