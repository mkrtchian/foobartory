import { fireEvent, render } from "@testing-library/react";
import { BasicStrategy, Game } from "../../../domain";
import GameContext from "../../contexts/game";
import ProbabilityCommands from "./ProbabilityCommands";

let game: Game;
let strategy: BasicStrategy;

function renderProbabilityCommands() {
  return render(
    <GameContext.Provider value={game}>
      <ProbabilityCommands />
    </GameContext.Provider>
  );
}

beforeEach(() => {
  strategy = new BasicStrategy();
  game = new Game(strategy);
});

it("updates the game probability options when using the sliders", () => {
  const { getByLabelText } = renderProbabilityCommands();
  const movementProbabilitySlider = getByLabelText(
    "Set the probability for robots to move."
  );
  fireEvent.change(movementProbabilitySlider, 10);
  expect(strategy.getAutomaticMovementProbability()).toEqual(10);
});
