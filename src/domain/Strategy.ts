import { Store } from "./store";

interface Strategy {
  actOnOneFrame(currentTime: number): void;
}

/**
 * Implements a basic strategy:
 * -
 */
class BasicStrategy implements Strategy {
  constructor(private store: Store) {}

  actOnOneFrame(currentTime: number) {
    this.store.robots.forEach(function doActions(robot) {
      robot.tick(currentTime);
      if (robot.isAvailable() && robot.getNextLocation()) {
        robot.startMoving(currentTime);
      }
    });
  }
}

export { BasicStrategy };
export type { Strategy };
