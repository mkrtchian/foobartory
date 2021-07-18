enum ActionType {
  MOVING = "moving",
  MINING_FOO = "mining foo",
  MINING_BAR = "mining bar",
  ASSEMBLING = "assembling",
  BUYING_ROBOT = "buying robot",
  WAITING = "waiting",
}

interface ActionBase {
  actionType: ActionType;
}
interface ActionWithDuration extends ActionBase {
  totalDuration: number;
}
interface ActionWithRandom extends ActionBase {
  randomBetween: [number, number];
}

type Action = ActionWithDuration | ActionWithRandom;

const MOVING: Action = {
  actionType: ActionType.MOVING,
  totalDuration: 5000,
};

const MINING_FOO: Action = {
  actionType: ActionType.MINING_FOO,
  totalDuration: 1000,
};

const MINING_BAR: Action = {
  actionType: ActionType.MINING_BAR,
  randomBetween: [500, 2000],
};

const ASSEMBLING: Action = {
  actionType: ActionType.ASSEMBLING,
  totalDuration: 2000,
};

const BUYING_ROBOT: Action = {
  actionType: ActionType.BUYING_ROBOT,
  totalDuration: 0,
};

const WAITING: Action = {
  actionType: ActionType.WAITING,
  totalDuration: 0,
};

type NeededRessources = {
  foos: number;
  bars: number;
  foobars: number;
};

const ASSEMBLING_NEEDED_RESSOURCES: NeededRessources = {
  foos: 1,
  bars: 1,
  foobars: 0,
};

const BUYING_ROBOT_NEEDED_RESSOURCES: NeededRessources = {
  foos: 6,
  bars: 0,
  foobars: 3,
};

export {
  MOVING,
  MINING_BAR,
  MINING_FOO,
  ASSEMBLING,
  BUYING_ROBOT,
  WAITING,
  ASSEMBLING_NEEDED_RESSOURCES,
  BUYING_ROBOT_NEEDED_RESSOURCES,
};
export type { Action, NeededRessources };
