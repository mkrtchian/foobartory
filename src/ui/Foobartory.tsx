import React, { useEffect, useRef } from "react";
import { BasicStrategy, Game, Location } from "../domain";
import GameContext from "./contexts/game";
import Statistics from "./Statistics";

function Foobartory() {
  const game = useRef(new Game(new BasicStrategy()));
  useEffect(() => {
    game.current.start();
    const strategy = game.current.getStrategy() as BasicStrategy;
    strategy.setLocationWeight(Location.FOO_MINE, 15);
    strategy.setLocationWeight(Location.SHOP, 10);
  }, []);
  return (
    <GameContext.Provider value={game.current}>
      <main role="main">
        <Statistics />
      </main>
    </GameContext.Provider>
  );
}

export default Foobartory;
