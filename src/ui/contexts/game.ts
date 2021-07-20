import React from "react";
import { BasicStrategy, Game } from "../../domain";

const GameContext = React.createContext<Game>(new Game(new BasicStrategy()));

export default GameContext;
