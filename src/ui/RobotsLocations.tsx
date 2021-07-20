/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useContext } from "react";
import { Location } from "../domain";
import GameContext from "./contexts/game";
import { useRobotsAmountByLocation } from "./hooks";

const MainSquare = styled.ul`
  height: 15rem;
  position: relative;
  margin: 3rem 0;
  list-style-type: none;
  padding: 0;

  @media (min-width: 950px) {
    flex: 1.4;
  }
`;

const circle = css`
  position: absolute;
  border-radius: 50%;
  transition: all 0.3s ease;
  transition-property: width, height, top, left, font-size;
  background-color: #333;
  color: #eee;
  display: grid;
  place-content: center;
`;
const FooCircle = styled.div`
  ${circle}
  top: 0;
  left: 0;
`;
const BarCircle = styled.div`
  ${circle}
  top: 0;
  right: 0;
`;
const FactoryCircle = styled.div`
  ${circle}
  bottom: 0;
  left: 0;
`;
const ShopCircle = styled.div`
  ${circle}
  bottom: 0;
  right: 0;
`;
const MovingCircle = styled.div`
  ${circle}
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
    return totalRobotsAmount && robotsInlocation
      ? (Math.sqrt(robotsInlocation) / Math.sqrt(totalRobotsAmount)) * 7
      : 0;
  }
  const fooSize = computeCircleSize(Location.FOO_MINE);
  const barSize = computeCircleSize(Location.BAR_MINE);
  const factorySize = computeCircleSize(Location.ASSEMBLING_FACTORY);
  const shopSize = computeCircleSize(Location.SHOP);
  const movingSize = computeCircleSize(Location.TRANSITION);

  return (
    <MainSquare>
      <li>
        <LabelFoo>Foo mine</LabelFoo>
        <FooCircle
          css={css`
            width: ${fooSize}rem;
            height: ${fooSize}rem;
            font-size: ${fooSize / 1.5}rem;
          `}
        >
          {robotsAmountByLocation.get(Location.FOO_MINE)}
        </FooCircle>
      </li>
      <li>
        <Labelbar>Bar mine</Labelbar>
        <BarCircle
          css={css`
            width: ${barSize}rem;
            height: ${barSize}rem;
            font-size: ${barSize / 1.5}rem;
          `}
        >
          {robotsAmountByLocation.get(Location.BAR_MINE)}
        </BarCircle>
      </li>
      <li>
        <LabelFactory>Assembling factory</LabelFactory>
        <FactoryCircle
          css={css`
            width: ${factorySize}rem;
            height: ${factorySize}rem;
            font-size: ${factorySize / 1.5}rem;
          `}
        >
          {robotsAmountByLocation.get(Location.ASSEMBLING_FACTORY)}
        </FactoryCircle>
      </li>
      <li>
        <LabelShop>Shop</LabelShop>
        <ShopCircle
          css={css`
            width: ${shopSize}rem;
            height: ${shopSize}rem;
            font-size: ${shopSize / 1.5}rem;
          `}
        >
          {robotsAmountByLocation.get(Location.SHOP)}
        </ShopCircle>
      </li>
      <li>
        <MovingCircle
          css={css`
            width: ${movingSize}rem;
            height: ${movingSize}rem;
            top: calc(50% - calc(${movingSize}rem / 2));
            left: calc(50% - calc(${movingSize}rem / 2));
            font-size: ${movingSize / 1.5}rem;
          `}
        >
          <LabelMoving>Moving</LabelMoving>
          {robotsAmountByLocation.get(Location.TRANSITION)}
        </MovingCircle>
      </li>
    </MainSquare>
  );
}

export default RobotsLocations;
