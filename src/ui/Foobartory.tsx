import React, { useEffect, useRef } from "react";
import { BasicStrategy, Game, Location } from "../domain";
import GameContext from "./contexts/game";
import RobotsLocations from "./RobotsLocations";
import Statistics from "./Statistics";

/**
 * The main component holding the whole app.
 */
function Foobartory() {
  const game = useRef(new Game(new BasicStrategy()));
  useEffect(() => {
    game.current.start();
    const strategy = game.current.getStrategy() as BasicStrategy;
    strategy.setLocationWeight(Location.FOO_MINE, 10);
    strategy.setLocationWeight(Location.BAR_MINE, 3);
    strategy.setAutomaticMovementProbability(25);
  }, []);
  return (
    <GameContext.Provider value={game.current}>
      <main role="main">
        <Statistics />
        <RobotsLocations />
      </main>
    </GameContext.Provider>
  );
}

export default Foobartory;
