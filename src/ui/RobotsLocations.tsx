import { useContext } from "react";
import { Location } from "../domain";
import GameContext from "./contexts/game";
import { useRobotsAmountByLocation } from "./hooks";

/**
 * Display a high level graphical view robots locations.
 */
function RobotsLocations() {
  const game = useContext(GameContext);
  const robotsAmountByLocation = useRobotsAmountByLocation(game);
  return (
    <ul>
      <li>Foo mine: {robotsAmountByLocation.get(Location.FOO_MINE)}</li>
      <li>Bar mine: {robotsAmountByLocation.get(Location.BAR_MINE)}</li>
      <li>
        Assembling factory:{" "}
        {robotsAmountByLocation.get(Location.ASSEMBLING_FACTORY)}
      </li>
      <li>Shop: {robotsAmountByLocation.get(Location.SHOP)}</li>
      <li>Moving: {robotsAmountByLocation.get(Location.TRANSITION)}</li>
    </ul>
  );
}

export default RobotsLocations;
