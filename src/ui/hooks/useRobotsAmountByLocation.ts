import { useMemo } from "react";
import { Game, Location, ObservedRobot } from "../../domain";
import { IncrementableMap } from "../../utils";
import { useRobotState } from "./useGameState";

/**
 * Build and return a Map associating locations with the number
 * of robots on that location, and the number of all robots.
 */
function useRobotsAmountByLocation(game: Game) {
  const robotsLocation = useRobotState<Location[]>({
    game,
    initialValue: [],
    observed: ObservedRobot.ROBOT_LOCATION,
  });

  const robotsAmountByLocation = useMemo(() => {
    let locations = new IncrementableMap<Location>([
      [Location.FOO_MINE, 0],
      [Location.BAR_MINE, 0],
      [Location.ASSEMBLING_FACTORY, 0],
      [Location.SHOP, 0],
      [Location.TRANSITION, 0],
    ]);
    robotsLocation.forEach((location) => {
      locations.increment(location);
    });
    return locations;
  }, [robotsLocation]);

  return { robotsAmountByLocation };
}

export { useRobotsAmountByLocation };
