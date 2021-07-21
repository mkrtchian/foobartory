import { render } from "@testing-library/react";
import { BasicStrategy, Game } from "../../../domain";
import { FakeDateTime } from "../../../domain/DateTime";
import GameContext from "../../contexts/game";
import Counter from "./Counter";

let game: Game;

function renderCounter() {
  return render(
    <GameContext.Provider value={game}>
      <Counter />
    </GameContext.Provider>
  );
}

it("displays the counter value in the correct format", async () => {
  const dateTime = new FakeDateTime();
  game = new Game(new BasicStrategy(), { dateTime });
  game.start();
  const { getByText } = renderCounter();
  expect(getByText("00:00")).toBeInTheDocument();
});
