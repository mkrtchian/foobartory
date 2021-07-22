import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BasicStrategy, Game, Location } from "../../../domain";
import { Robot } from "../../../domain/Robot";
import GameContext from "../../contexts/game";
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

it("displays total robots amount by location, and total moving", () => {
  const { getByText, getAllByText } = renderRobotsLocations();
  act(() => {
    game.store.getRobots()[0].setLocation(Location.FOO_MINE);
    game.store.getRobots()[1].setLocation(Location.FOO_MINE);
    new Robot(game.store, { initialLocation: Location.BAR_MINE });
    new Robot(game.store, { initialLocation: Location.BAR_MINE });
    new Robot(game.store, { initialLocation: Location.BAR_MINE });
    new Robot(game.store, { initialLocation: Location.ASSEMBLING_FACTORY });
    new Robot(game.store, { initialLocation: Location.ASSEMBLING_FACTORY });
    new Robot(game.store, { initialLocation: Location.ASSEMBLING_FACTORY });
    new Robot(game.store, { initialLocation: Location.ASSEMBLING_FACTORY });
    new Robot(game.store, { initialLocation: Location.SHOP });
  });
  // 0 moving + 0 robots roging to each of 4 locations
  expect(getAllByText("0")).toHaveLength(5);
  expect(getByText("1")).toBeInTheDocument();
  expect(getByText("2")).toBeInTheDocument();
  expect(getByText("3")).toBeInTheDocument();
  expect(getByText("4")).toBeInTheDocument();
});
