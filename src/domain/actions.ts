enum ActionType {
  MOVING = "moving",
  MINING_FOO = "mining foo",
  MINING_BAR = "mining bar",
  ASSEMBLING = "assembling",
  BUYING = "buying",
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

const BUYING: Action = {
  actionType: ActionType.BUYING,
  totalDuration: 0,
};

const WAITING: Action = {
  actionType: ActionType.WAITING,
  totalDuration: 0,
};

export { MOVING, MINING_BAR, MINING_FOO, ASSEMBLING, BUYING, WAITING };
export type { Action };
