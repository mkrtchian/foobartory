import { Store } from "./store";

enum Location {
  FOO_MINE = "foo mine",
  BAR_MINE = "bar mine",
  ASSEMBLING_FACTORY = "assembling factory",
  SHOP = "shop",
}

class Robot {
  location: Location;

  constructor(private store: Store) {
    this.location = Location.SHOP;
    this.store.robots.push(this);
  }

  moveTo(location: Location) {
    this.location = location;
  }

  getLocation() {
    return this.location;
  }

  mine() {
    if (this.location === Location.FOO_MINE) {
      this.store.foosAmount += 1;
    } else if (this.location === Location.BAR_MINE) {
      this.store.barsAmount += 1;
    } else {
      throw new Error(
        `The robot has to be in a mine to mine, here it is in ${this.location}.`
      );
    }
  }

  assemble() {
    this.checkLocation(Location.ASSEMBLING_FACTORY);
    this.checkRessources(
      "To create a foobar the robot needs one foo and one bar",
      1,
      1,
      0
    );
    this.store.fooBarsAmount += 1;
    this.store.barsAmount -= 1;
    this.store.foosAmount -= 1;
  }

  buyRobot() {
    this.checkLocation(Location.SHOP);
    this.checkRessources(
      "To buy a new robot, the robot needs 6 foos and 3 foobars",
      6,
      0,
      3
    );
    this.store.fooBarsAmount -= 3;
    this.store.foosAmount -= 6;
    new Robot(this.store);
  }

  private checkLocation(location: Location) {
    if (location !== this.location) {
      throw new Error(
        `The robot has to be in the ${location}, here it is in ${this.location}.`
      );
    }
  }
  private checkRessources(
    errorMessageBeginning: string,
    neededFoos: number,
    neededBars: number,
    neededFoobars: number
  ) {
    const enoughRessources =
      this.store.fooBarsAmount >= neededFoobars &&
      this.store.foosAmount >= neededFoos &&
      this.store.barsAmount >= neededBars;
    if (!enoughRessources) {
      throw new Error(
        `${errorMessageBeginning}.
        There are only ${this.store.foosAmount} foos and ${this.store.fooBarsAmount} foobars.`
      );
    }
  }
}

export { Robot, Location };
