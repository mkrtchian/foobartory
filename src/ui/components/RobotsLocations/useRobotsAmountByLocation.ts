import { useMemo } from "react";
import { Game, Location, ObservedRobot } from "../../../domain";
import { IncrementableMap } from "../../../utils";
import { useRobotState } from "../../hooks/useGameState";

/**
 * Build and return a Map associating locations with the number
 * of robots on that location.
 */
function useRobotsAmountByLocation(game: Game) {
  const { robotsValues } = useRobotsValue<Location>({
    game,
    observedType: ObservedRobot.ROBOT_LOCATION,
    mapInitialValue: [
      [Location.FOO_MINE, 0],
      [Location.BAR_MINE, 0],
      [Location.ASSEMBLING_FACTORY, 0],
      [Location.SHOP, 0],
      [Location.TRANSITION, 0],
    ],
  });
  return { robotsAmountByLocation: robotsValues };
}

/**
 * Build and return a Map associating locations with the number
 * of robots that are currently moving to that location.
 */
function useRobotsAmountByNextLocation(game: Game) {
  const { robotsValues } = useRobotsValue<Location | null>({
    game,
    observedType: ObservedRobot.ROBOT_NEXT_LOCATION,
    mapInitialValue: [
      [Location.FOO_MINE, 0],
      [Location.BAR_MINE, 0],
      [Location.ASSEMBLING_FACTORY, 0],
      [Location.SHOP, 0],
    ],
  });
  return { robotsAmountByNextLocation: robotsValues };
}

type RobotsValueProps<T> = {
  game: Game;
  observedType: ObservedRobot;
  mapInitialValue: [T, any][];
};

function useRobotsValue<T>({
  game,
  observedType,
  mapInitialValue,
}: RobotsValueProps<T>) {
  const robotsNextLocation = useRobotState<T[]>({
    game,
    initialValue: [],
    observed: observedType,
  });

  const robotsValues = useMemo(() => {
    let locations = new IncrementableMap<T>(mapInitialValue);
    robotsNextLocation.forEach((location) => {
      locations.increment(location);
    });
    return locations;
  }, [robotsNextLocation, mapInitialValue]);

  return { robotsValues };
}

export { useRobotsAmountByLocation, useRobotsAmountByNextLocation };
