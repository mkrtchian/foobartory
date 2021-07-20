import { useEffect, useState } from "react";
import { Game, ObservedAmount, ObservedRobot } from "../../domain";

/**
 * These hooks create observer states, subscribing to the game
 * observable API.
 */

interface UseGameStateProps<T> {
  game: Game;
  initialValue: T;
}

interface UseStoreStateProps<T> extends UseGameStateProps<T> {
  observed: ObservedAmount;
}

interface UseRobotStateProps<T> extends UseGameStateProps<T> {
  observed: ObservedRobot;
}

function useStoreState<T>({
  game,
  initialValue,
  observed,
}: UseStoreStateProps<T>) {
  const [storeState, setStoreState] = useState<T>(initialValue);
  useEffect(
    function observeStore() {
      game.subscribeToAmount(observed, setStoreState);
    },
    [game, observed]
  );
  return storeState;
}

function useRobotState<T>({
  game,
  initialValue,
  observed,
}: UseRobotStateProps<T>) {
  const [robotState, setRobotState] = useState<T>(initialValue);
  useEffect(
    function observeRobot() {
      game.subscribeToRobots(observed, setRobotState);
    },
    [game, observed]
  );
  return robotState;
}

export { useStoreState, useRobotState };
