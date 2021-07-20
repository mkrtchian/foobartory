import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BasicStrategy, Game, Location } from "../domain";
import { Robot } from "../domain/Robot";
import GameContext from "./contexts/game";
import RobotsLocations from "./RobotsLocations";

let game: Game;

function renderRobotsLocations() {
  return render(
    <GameContext.Provider value={game}>
      <RobotsLocations />
    </GameContext.Provider>
  );
}

beforeEach(() => {
  game = new Game(new BasicStrategy());
});

test("displays total robots amount by location", () => {
  const { getByText } = renderRobotsLocations();
  act(() => {
    game.store.getRobots()[0].setLocation(Location.FOO_MINE);
    game.store.getRobots()[1].setLocation(Location.FOO_MINE);
    new Robot(game.store, { initialLocation: Location.BAR_MINE });
    new Robot(game.store, { initialLocation: Location.BAR_MINE });
    new Robot(game.store, { initialLocation: Location.BAR_MINE });
  });
  expect(getByText(/Foo mine: 2/i)).toBeInTheDocument();
  expect(getByText(/Bar mine: 3/)).toBeInTheDocument();
  expect(getByText(/Assembling factory: 0/)).toBeInTheDocument();
  expect(getByText(/Shop: 0/)).toBeInTheDocument();
  expect(getByText(/Moving: 0/)).toBeInTheDocument();
});
