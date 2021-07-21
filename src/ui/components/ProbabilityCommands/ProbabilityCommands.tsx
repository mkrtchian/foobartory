import styled from "@emotion/styled";
import { useContext } from "react";
import { BasicStrategy, Location } from "../../../domain";
import GameContext from "../../contexts/game";
import SliderCommand from "./SliderCommand";

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
  padding-top: 2rem;
  border-top: solid 1px #ddd;
  display: grid;

  @media (min-width: 950px) {
    flex-basis: 100%;
    border: none;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1.3fr 1fr 1fr;
    column-gap: 5%;
  }
`;

/**
 * Provide slider commands to control the game automatic mode
 * by influencing the random actions.
 */
function ProbabilityCommands() {
  const game = useContext(GameContext);
  const strategy = game.getStrategy() as BasicStrategy;
  function handleMovementProbabilityChange(
    _: object,
    value: number | number[]
  ) {
    strategy.setAutomaticMovementProbability(value as number);
  }
  function createLocationWeightChangeHandler(location: Location) {
    return function handleLocationWeightChange(
      _: object,
      value: number | number[]
    ) {
      strategy.setLocationWeight(location, value as number);
    };
  }
  return (
    <List>
      <SliderCommand
        id="movement-probability"
        text="Probability to move"
        defaultValue={strategy.getAutomaticMovementProbability()}
        onChange={handleMovementProbabilityChange}
        first={true}
      />
      <SliderCommand
        id="foo-mine-weight"
        text="Foo mine weight"
        defaultValue={strategy.getLocationWeight(Location.FOO_MINE)}
        onChange={createLocationWeightChangeHandler(Location.FOO_MINE)}
      />
      <SliderCommand
        id="bar-mine-weight"
        text="Bar mine weight"
        defaultValue={strategy.getLocationWeight(Location.BAR_MINE)}
        onChange={createLocationWeightChangeHandler(Location.BAR_MINE)}
      />
      <SliderCommand
        id="assembling-factory-weight"
        text="Assembling factory weight"
        defaultValue={strategy.getLocationWeight(Location.ASSEMBLING_FACTORY)}
        onChange={createLocationWeightChangeHandler(
          Location.ASSEMBLING_FACTORY
        )}
      />
      <SliderCommand
        id="shop-weight"
        text="Shop weight"
        defaultValue={strategy.getLocationWeight(Location.SHOP)}
        onChange={createLocationWeightChangeHandler(Location.SHOP)}
      />
    </List>
  );
}

export default ProbabilityCommands;
