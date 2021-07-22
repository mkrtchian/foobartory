/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useContext } from "react";
import { Location } from "../../../domain";
import GameContext from "../../contexts/game";
import { BarArrow, FactoryArrow, FooArrow, ShopArrow } from "./arrows";
import {
  BarCircle,
  FactoryCircle,
  FooCircle,
  MovingCircle,
  ShopCircle,
} from "./circles";
import {
  useRobotsAmountByLocation,
  useRobotsAmountByNextLocation,
} from "./useRobotsAmountByLocation";

const MainSquare = styled.ul`
  height: 15rem;
  position: relative;
  margin: 3rem 0 3.7rem 0;
  list-style-type: none;
  padding: 0;

  @media (min-width: 950px) {
    flex: 1.35;
    height: 17rem;
  }
`;

const label = css`
  position: absolute;
  font-weight: bold;
  padding: 0.2rem 0;
`;
const FooLabel = styled.span`
  ${label}
  top: -2.1rem;
  left: 0;
`;
const BarLabel = styled.span`
  ${label}
  top: -2.1rem;
  right: 0;
`;
const FactoryLabel = styled.span`
  ${label}
  bottom: -2.2rem;
  left: 0;
`;
const ShopLabel = styled.span`
  ${label}
  bottom: -2.2rem;
  right: 0;
`;
const MovingLabel = styled.span`
  ${label}
  transition: all 0.3s ease;
  transition-property: top, left;
  color: black;
  font-size: 1.13rem;
  bottom: -2rem;
  left: calc(50% - 2rem);
`;

/**
 * Display a high level graphical view of robots current and next locations.
 */
function RobotsLocations() {
  const game = useContext(GameContext);
  const { robotsAmountByLocation } = useRobotsAmountByLocation(game);
  const totalRobotsAmount = game.store.getRobots().length;
  const { robotsAmountByNextLocation } = useRobotsAmountByNextLocation(game);
  const totalRobotsWithNextLocation = game.store
    .getRobots()
    .reduce(function amountWithNextLocation(accumulator, robot) {
      return robot.getNextLocation() ? accumulator + 1 : accumulator;
    }, 0);

  function computeCircleSize(location: Location) {
    const robotsInlocation = robotsAmountByLocation.get(location);
    /* With the square root division the circle sizes increase in a
       softer way: a circle with 1 robot will be 3.9 times smaller
       than a circle with 15 robots, instead of 15 times smaller. */
    return totalRobotsAmount && robotsInlocation
      ? (Math.sqrt(robotsInlocation) / Math.sqrt(totalRobotsAmount)) * 7
      : 0;
  }
  function computeArrowSize(location: Location) {
    const robotsNextlocation = robotsAmountByNextLocation.get(location);
    return totalRobotsWithNextLocation && robotsNextlocation
      ? (Math.sqrt(robotsNextlocation) /
          Math.sqrt(totalRobotsWithNextLocation)) *
          9
      : 0;
  }
  return (
    <MainSquare>
      <li>
        <FooLabel>Foo mine</FooLabel>
        <FooCircle size={computeCircleSize(Location.FOO_MINE)}>
          {robotsAmountByLocation.get(Location.FOO_MINE)}
        </FooCircle>
        <FooArrow
          size={computeArrowSize(Location.FOO_MINE)}
          value={robotsAmountByNextLocation.get(Location.FOO_MINE) as number}
        />
      </li>
      <li>
        <BarLabel>Bar mine</BarLabel>
        <BarCircle size={computeCircleSize(Location.BAR_MINE)}>
          {robotsAmountByLocation.get(Location.BAR_MINE)}
        </BarCircle>
        <BarArrow
          size={computeArrowSize(Location.BAR_MINE)}
          value={robotsAmountByNextLocation.get(Location.BAR_MINE) as number}
        />
      </li>
      <li>
        <FactoryLabel>Assembling factory</FactoryLabel>
        <FactoryCircle size={computeCircleSize(Location.ASSEMBLING_FACTORY)}>
          {robotsAmountByLocation.get(Location.ASSEMBLING_FACTORY)}
        </FactoryCircle>
        <FactoryArrow
          size={computeArrowSize(Location.ASSEMBLING_FACTORY)}
          value={
            robotsAmountByNextLocation.get(
              Location.ASSEMBLING_FACTORY
            ) as number
          }
        />
      </li>
      <li>
        <ShopLabel>Shop</ShopLabel>
        <ShopCircle size={computeCircleSize(Location.SHOP)}>
          {robotsAmountByLocation.get(Location.SHOP)}
        </ShopCircle>
        <ShopArrow
          size={computeArrowSize(Location.SHOP)}
          value={robotsAmountByNextLocation.get(Location.SHOP) as number}
        />
      </li>
      <li>
        <MovingCircle size={computeCircleSize(Location.TRANSITION)}>
          <MovingLabel>Moving</MovingLabel>
          {robotsAmountByLocation.get(Location.TRANSITION)}
        </MovingCircle>
      </li>
    </MainSquare>
  );
}

export default RobotsLocations;
