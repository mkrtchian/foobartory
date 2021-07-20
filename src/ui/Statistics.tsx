import { useContext, useEffect, useState } from "react";
import { ObservedAmount } from "../domain";
import GameContext from "./contexts/game";

function Statistics() {
  const game = useContext(GameContext);
  const [foosAmount, setFoosAmount] = useState<number>(
    game.store.getFoosAmount()
  );
  const [barsAmount, setBarsAmount] = useState<number>(
    game.store.getBarsAmount()
  );
  const [foobarsAmount, setFoobarsAmount] = useState<number>(
    game.store.getFoobarsAmount()
  );
  const [robotsAmount, setRobotsAmount] = useState<number>(
    game.store.getRobots().length
  );
  useEffect(() => {
    game.subscribeToAmount(ObservedAmount.FOOS_AMOUNT, setFoosAmount);
    game.subscribeToAmount(ObservedAmount.BARS_AMOUNT, setBarsAmount);
    game.subscribeToAmount(ObservedAmount.FOOBARS_AMOUNT, setFoobarsAmount);
    game.subscribeToAmount(ObservedAmount.ROBOTS_AMOUNT, setRobotsAmount);
  }, [game]);

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
