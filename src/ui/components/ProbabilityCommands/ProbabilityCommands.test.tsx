import { fireEvent, render } from "@testing-library/react";
import { BasicStrategy, Game, Location } from "../../../domain";
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
  const movementProbabilitySlider = getByLabelText(/Probability to move/);
  fireEvent.change(movementProbabilitySlider, { target: { value: 10 } });
  expect(strategy.getAutomaticMovementProbability()).toEqual(10);

  const fooMineWeightSlider = getByLabelText(/Foo mine weight/);
  fireEvent.change(fooMineWeightSlider, { target: { value: 11 } });
  expect(strategy.getLocationWeight(Location.FOO_MINE)).toEqual(11);

  const barMineWeightSlider = getByLabelText(/Bar mine weight/);
  fireEvent.change(barMineWeightSlider, { target: { value: 12 } });
  expect(strategy.getLocationWeight(Location.BAR_MINE)).toEqual(12);

  const factoryWeightSlider = getByLabelText(/Assembling factory weight/);
  fireEvent.change(factoryWeightSlider, { target: { value: 13 } });
  expect(strategy.getLocationWeight(Location.ASSEMBLING_FACTORY)).toEqual(13);

  const shopWeightSlider = getByLabelText(/Shop weight/);
  fireEvent.change(shopWeightSlider, { target: { value: 13 } });
  expect(strategy.getLocationWeight(Location.SHOP)).toEqual(13);
});
