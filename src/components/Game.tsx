import React, { useContext } from "react";
import Grid, { GridType } from "./Grid";
import Form from "./Form";
import "../styles/game.scss";
import { Context } from "../reducers/gameReducer";
import { isDefeated, isVictorious } from "../helpers/rules";
import { startGame } from "../helpers/grid";

export type GameType = {
  size: number;
  bombs: number;
  isGameReady: boolean;
  errorMessage: string;
  gameHelp: boolean;
  cells: GridType;
};

export type GameActionType = {
  type: string;
  data?: any;
};

const Game = () => {
  const { store, dispatch } = useContext(Context);

  const gameOver =
    (isDefeated(store.cells) && "Game over...") ||
    (isVictorious(store.cells) && "Congratulations !") ||
    "Good luck !";

  return (
    <div className="Game">
      {store.isGameReady ? (
        <div className="Game_wrapper">
          <div className="Game__header">{gameOver}</div>
          <Grid />
          <button
            className="Game__playButton"
            onClick={() => dispatch({ type: "UPDATE_GAME_READY" })}
          >
            Back
          </button>
          <button
            className="Game__playButton"
            onClick={() => dispatch({ type: "UPDATE_GAME_HELP" })}
          >
            {store.gameHelp ? "Hide help" : "Help"}
          </button>
          <button
            className="Game__playButton"
            onClick={() => dispatch(startGame(store.size, store.bombs))}
          >
            Play again
          </button>
        </div>
      ) : (
        <Form />
      )}
    </div>
  );
};

export default Game;
