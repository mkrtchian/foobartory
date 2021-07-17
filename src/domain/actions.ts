enum ActionType {
  MOVING = "moving",
  MINING_FOO = "mining",
  MINING_BAR = "mining",
  ASSEMBLING = "assembling",
  BUYING = "buying",
  WAITING = "waiting",
}

type Action = {
  actionType: ActionType;
  getTotalDuration: () => number;
};

const MOVING: Action = {
  actionType: ActionType.MOVING,
  getTotalDuration: () => 5000,
};

const MINING_FOO: Action = {
  actionType: ActionType.MINING_FOO,
  getTotalDuration: () => 1000,
};

const MINING_BAR: Action = {
  actionType: ActionType.MINING_BAR,
  getTotalDuration: () => 2000,
};

const ASSEMBLING: Action = {
  actionType: ActionType.ASSEMBLING,
  getTotalDuration: () => 2000,
};

const BUYING: Action = {
  actionType: ActionType.BUYING,
  getTotalDuration: () => 0,
};

const WAITING: Action = {
  actionType: ActionType.WAITING,
  getTotalDuration: () => 0,
};

export { MOVING, MINING_BAR, MINING_FOO, ASSEMBLING, BUYING, WAITING };
export type { Action };
