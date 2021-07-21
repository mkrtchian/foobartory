import styled from "@emotion/styled";
import { useContext, useEffect, useState } from "react";
import GameContext from "../../contexts/game";

const Span = styled.span`
  font-size: 1.6rem;
  padding: 0.5rem 0;

  @media (min-width: 600px) {
    font-size: 1.7rem;
  }
  @media (min-width: 950px) {
    font-size: 1.8rem;
  }
`;

/**
 * Count the current time according to the game internal date time.
 * The counter freezes when the game is finished.
 */
function Counter() {
  const game = useContext(GameContext);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (game.getStarted()) {
        try {
          setTime(game.getCurrentTime());
        } catch {
          clearInterval(interval);
        }
      }
    }, 100);
    return () => clearInterval(interval);
  }, [game]);

  function formatDate(time: number) {
    const startTime = game.getStartTime();
    if (startTime) {
      const date = new Date(time - startTime);
      const min = formatNumber(date.getMinutes());
      const sec = formatNumber(date.getSeconds());
      return `${min}:${sec}`;
    } else {
      return "00:00";
    }
  }
  function formatNumber(number: number) {
    return number < 10 ? "0" + number : "" + number;
  }

  return <Span>{formatDate(time)}</Span>;
}

export default Counter;
