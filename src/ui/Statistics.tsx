import { useContext } from "react";
import { ObservedAmount } from "../domain";
import GameContext from "./contexts/game";
import { useStoreState } from "./hooks";

/**
 * Display statistics on what is available in the game store.
 */
function Statistics() {
  const game = useContext(GameContext);
  const foosAmount = useStoreState<number>({
    game,
    initialValue: game.store.getFoosAmount(),
    observed: ObservedAmount.FOOS_AMOUNT,
  });
  const barsAmount = useStoreState<number>({
    game,
    initialValue: game.store.getBarsAmount(),
    observed: ObservedAmount.BARS_AMOUNT,
  });
  const foobarsAmount = useStoreState<number>({
    game,
    initialValue: game.store.getFoobarsAmount(),
    observed: ObservedAmount.FOOBARS_AMOUNT,
  });
  const robotsAmount = useStoreState<number>({
    game,
    initialValue: game.store.getRobots().length,
    observed: ObservedAmount.ROBOTS_AMOUNT,
  });
  return (
    <ul>
      <li>
        Foos: <span>{foosAmount}</span>
      </li>
      <li>
        Bars: <span>{barsAmount}</span>
      </li>
      <li>
        Foobars: <span>{foobarsAmount}</span>
      </li>
      <li>
        Robots: <span>{robotsAmount}</span>
      </li>
    </ul>
  );
}

export default Statistics;
