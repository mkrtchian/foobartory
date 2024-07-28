import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react";
import { BasicStrategy, Game } from "../../../domain";
import { Robot } from "../../../domain/Robot";
import GameContext from "../../contexts/game";
import Statistics from "./Statistics";

let game: Game;

function renderStatistics() {
  return render(
    <GameContext.Provider value={game}>
      <Statistics />
    </GameContext.Provider>
  );
}

beforeEach(() => {
  game = new Game(new BasicStrategy());
});

it("displays the statistics values", () => {
  const { getByText } = renderStatistics();
  act(() => {
    game.store.setFoosAmount(345);
    game.store.setBarsAmount(222);
    game.store.setFoobarsAmount(830);
    new Robot(game.store);
  });
  expect(getByText("345")).toBeInTheDocument();
  expect(getByText("222")).toBeInTheDocument();
  expect(getByText("830")).toBeInTheDocument();
  expect(getByText("3 / 20")).toBeInTheDocument();
});
