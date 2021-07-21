import styled from "@emotion/styled";
import { useContext } from "react";
import { MAX_ROBOTS, ObservedAmount } from "../../../domain";
import GameContext from "../../contexts/game";
import { useStoreState } from "../../hooks";

const List = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0;
  justify-content: space-around;
  background-color: #eee;
  border-radius: 0.3rem;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
  padding: 0.3rem 0;

  @media (min-width: 950px) {
    flex: 1;
    margin-right: 5%;
    flex-wrap: wrap;
    border-radius: 0.4rem;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
  }
  @media (min-width: 1200px) {
    margin-right: 6%;
  }
`;
const Li = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 950px) {
    flex-basis: 50%;
    justify-content: center;
  }
`;

const Label = styled.span`
  font-weight: bold;
  padding: 0.2rem 0.4rem;

  @media (min-width: 950px) {
    margin-bottom: 0.3rem;
  }
`;
const Value = styled.span`
  padding: 0.2rem 0.4rem;
  font-size: 1.1rem;

  @media (min-width: 500px) {
    font-size: 1.2rem;
  }
  @media (min-width: 950px) {
    font-size: 1.5rem;
  }
`;

/**
 * Display statistics on what is available in the game store.
 */
function Statistics() {
  const game = useContext(GameContext);
  const foosAmount = useStoreState<number>({
    game,
    initialValue: game.store.getFoosAmount(),
    observed: ObservedAmount.FOOS_AMOUNT,
  });
  const barsAmount = useStoreState<number>({
    game,
    initialValue: game.store.getBarsAmount(),
    observed: ObservedAmount.BARS_AMOUNT,
  });
  const foobarsAmount = useStoreState<number>({
    game,
    initialValue: game.store.getFoobarsAmount(),
    observed: ObservedAmount.FOOBARS_AMOUNT,
  });
  const robotsAmount = useStoreState<number>({
    game,
    initialValue: game.store.getRobots().length,
    observed: ObservedAmount.ROBOTS_AMOUNT,
  });
  return (
    <List>
      <Li>
        <Label>Foos</Label>
        <Value>{foosAmount}</Value>
      </Li>
      <Li>
        <Label>Bars</Label>
        <Value>{barsAmount}</Value>
      </Li>
      <Li>
        <Label>Foobars</Label>
        <Value>{foobarsAmount}</Value>
      </Li>
      <Li>
        <Label>Robots</Label>
        <Value>
          {robotsAmount} / {MAX_ROBOTS}
        </Value>
      </Li>
    </List>
  );
}

export default Statistics;
