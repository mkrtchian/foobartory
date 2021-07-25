import Location from "./locations";

enum ActionType {
  MOVING = "moving",
  MINING_FOO = "mining foo",
  MINING_BAR = "mining bar",
  ASSEMBLING = "assembling",
  BUYING_ROBOT = "buying robot",
  WAITING = "waiting",
}

type Ressources = {
  foos?: number;
  bars?: number;
  foobars?: number;
  robots?: number;
};
interface NeededRessources extends Ressources {
  errorMessage: string;
}

interface ActionBase {
  actionType: ActionType;
  /**
   * If the needed ressources are not satisfied, the action can't be done.
   */
  neededressources?: NeededRessources;
  /**
   * The ressources that are earned if the action is successful.
   */
  successfulResult?: Ressources;
  /**
   * The ressources that are lost if the action is successful.
   */
  unsuccessfulResult?: Ressources;
  /**
   * The chances of success fot that action.
   */
  successPercentage?: number;
  /**
   * The only location where the action can be performed.
   */
  location?: Location;
}
interface ActionWithDuration extends ActionBase {
  totalDuration: number;
}
interface ActionWithRandomDuration extends ActionBase {
  /**
   * The total duration can be between the two values.
   */
  totalDurationIn: readonly [number, number];
}

type Action = ActionWithDuration | ActionWithRandomDuration;

const MOVING: ActionWithDuration = {
  actionType: ActionType.MOVING,
  totalDuration: 5000,
} as const;

const MINING_FOO: ActionWithDuration = {
  actionType: ActionType.MINING_FOO,
  totalDuration: 1000,
  successfulResult: {
    foos: 1,
  },
  location: Location.FOO_MINE,
} as const;

const MINING_BAR: ActionWithRandomDuration = {
  actionType: ActionType.MINING_BAR,
  totalDurationIn: [500, 2000],
  successfulResult: {
    bars: 1,
  },
  location: Location.BAR_MINE,
} as const;

const ASSEMBLING: ActionWithDuration = {
  actionType: ActionType.ASSEMBLING,
  totalDuration: 2000,
  neededressources: {
    foos: 1,
    bars: 1,
    errorMessage: "To create a foobar the robot needs one foo and one bar",
  },
  successfulResult: {
    foobars: 1,
  },
  unsuccessfulResult: {
    bars: 1,
  },
  successPercentage: 60,
  location: Location.ASSEMBLING_FACTORY,
} as const;

const BUYING_ROBOT: ActionWithDuration = {
  actionType: ActionType.BUYING_ROBOT,
  totalDuration: 0,
  neededressources: {
    foos: 6,
    foobars: 3,
    errorMessage: "To buy a new robot, the robot needs 6 foos and 3 foobars",
  },
  successfulResult: {
    robots: 1,
  },
  location: Location.SHOP,
} as const;

const WAITING: ActionWithDuration = {
  actionType: ActionType.WAITING,
  totalDuration: 0,
} as const;

function isActionWithRandomDuration(
  value: Action
): value is ActionWithRandomDuration {
  return (value as ActionWithRandomDuration).totalDurationIn !== undefined;
}

function isActionWithDuration(value: Action): value is ActionWithDuration {
  return (value as ActionWithDuration).totalDuration !== undefined;
}

export {
  MOVING,
  MINING_BAR,
  MINING_FOO,
  ASSEMBLING,
  BUYING_ROBOT,
  WAITING,
  isActionWithRandomDuration,
  isActionWithDuration,
};
export type {
  Action,
  ActionWithDuration,
  ActionWithRandomDuration,
  Ressources,
  NeededRessources,
};
