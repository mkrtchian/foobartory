import styled from "@emotion/styled";
import { useEffect, useRef } from "react";
import { BasicStrategy, Game } from "../domain";
import { ProbabilityCommands } from "./components/ProbabilityCommands";
import { RobotsLocations } from "./components/RobotsLocations";
import { Statistics } from "./components/Statistics";
import GameContext from "./contexts/game";
import "./global.css";

const Main = styled.main`
  padding: 1rem;
  display: flex;
  justify-content: center;

  @media (min-width: 450px) {
    padding: 1rem 2rem;
  }
  @media (min-width: 600px) {
    padding: 1rem 8%;
  }
  @media (min-width: 950px) {
    padding: 1rem 4rem;
  }
`;

const Container = styled.div`
  flex: 1;
  max-width: 1200px;
  display: flex;
  flex-direction: column;

  @media (min-width: 950px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: flex-start;
  }
`;

const Title = styled.h1`
  @media (min-width: 950px) {
    flex-basis: 100%;
  }
`;

/**
 * The main component holding the whole app.
 */
function Foobartory() {
  const game = useRef(new Game(new BasicStrategy()));
  useEffect(() => {
    game.current.start();
  }, []);
  return (
    <GameContext.Provider value={game.current}>
      <Main role="main">
        <Container>
          <Title>Foobartory</Title>
          <Statistics />
          <RobotsLocations />
          <ProbabilityCommands />
        </Container>
      </Main>
    </GameContext.Provider>
  );
}

export default Foobartory;
