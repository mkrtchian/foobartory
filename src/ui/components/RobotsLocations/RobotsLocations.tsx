/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useContext } from "react";
import { Location } from "../../../domain";
import GameContext from "../../contexts/game";
import { useRobotsAmountByLocation } from "../../hooks";
import {
  BarCircle,
  FactoryCircle,
  FooCircle,
  MovingCircle,
  ShopCircle,
} from "./Circles";

const MainSquare = styled.ul`
  height: 15rem;
  position: relative;
  margin: 3rem 0;
  list-style-type: none;
  padding: 0;

  @media (min-width: 950px) {
    flex: 1.35;
  }
`;

const label = css`
  position: absolute;
  font-weight: bold;
  padding: 0.2rem 0;
`;
const LabelFoo = styled.span`
  ${label}
  top: -2.1rem;
  left: 0;
`;
const Labelbar = styled.span`
  ${label}
  top: -2.1rem;
  right: 0;
`;
const LabelFactory = styled.span`
  ${label}
  bottom: -2.2rem;
  left: 0;
`;
const LabelShop = styled.span`
  ${label}
  bottom: -2.2rem;
  right: 0;
`;
const LabelMoving = styled.span`
  ${label}
  transition: all 0.3s ease;
  transition-property: top, left;
  color: black;
  font-size: 1.13rem;
  bottom: -2rem;
  left: calc(50% - 2rem);
`;

/**
 * Display a high level graphical view robots locations.
 */
function RobotsLocations() {
  const game = useContext(GameContext);
  const { robotsAmountByLocation } = useRobotsAmountByLocation(game);
  const totalRobotsAmount = game.store.getRobots().length;

  function computeCircleSize(location: Location) {
    const robotsInlocation = robotsAmountByLocation.get(location);
    /* With the square root division the circle sizes increase in a
       softer way: a circle with 1 robot will be 3.9 times smaller
       than a circle with 15 robots, instead of 15 times smaller. */
    return totalRobotsAmount && robotsInlocation
      ? (Math.sqrt(robotsInlocation) / Math.sqrt(totalRobotsAmount)) * 7
      : 0;
  }
  return (
    <MainSquare>
      <li>
        <LabelFoo>Foo mine</LabelFoo>
        <FooCircle size={computeCircleSize(Location.FOO_MINE)}>
          {robotsAmountByLocation.get(Location.FOO_MINE)}
        </FooCircle>
      </li>
      <li>
        <Labelbar>Bar mine</Labelbar>
        <BarCircle size={computeCircleSize(Location.BAR_MINE)}>
          {robotsAmountByLocation.get(Location.BAR_MINE)}
        </BarCircle>
      </li>
      <li>
        <LabelFactory>Assembling factory</LabelFactory>
        <FactoryCircle size={computeCircleSize(Location.ASSEMBLING_FACTORY)}>
          {robotsAmountByLocation.get(Location.ASSEMBLING_FACTORY)}
        </FactoryCircle>
      </li>
      <li>
        <LabelShop>Shop</LabelShop>
        <ShopCircle size={computeCircleSize(Location.SHOP)}>
          {robotsAmountByLocation.get(Location.SHOP)}
        </ShopCircle>
      </li>
      <li>
        <MovingCircle size={computeCircleSize(Location.TRANSITION)}>
          <LabelMoving>Moving</LabelMoving>
          {robotsAmountByLocation.get(Location.TRANSITION)}
        </MovingCircle>
      </li>
    </MainSquare>
  );
}

export default RobotsLocations;
