import React, { useContext } from "react";
import Grid, { GridType } from "./Grid";
import Form from "./Form";
import "../styles/game.scss";
import { Context } from "../reducers/gameReducer";

export type GameType = {
  size: number;
  bombs: number;
  isGameReady: boolean;
  errorMessage: string;
  cells: GridType;
};

export type GameActionType = {
  type: string;
  data?: any;
};

const Game = () => {
  const { store, dispatch } = useContext(Context);

  return <div>{store.isGameReady ? <Grid /> : <Form />}</div>;
};

export default Game;
