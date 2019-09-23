import React from "react";
import { GameType, GameActionType } from "../components/Game";

export const initialState: GameType = {
  size: 10,
  bombs: 10,
  isGameReady: false,
  errorMessage: "",
  cells: []
};

interface IContextProps {
  store: GameType;
  dispatch: ({ type, data }: { type: string; data?: any }) => void;
}

export const gameReducer = (
  state: GameType,
  action: GameActionType
): GameType => {
  switch (action.type) {
    case "changeSize":
      return {
        ...state,
        size: action.data
      };

    case "changeBombs":
      return {
        ...state,
        bombs: action.data
      };

    case "changeGameReady":
      return {
        ...state,
        isGameReady: !state.isGameReady
      };

    case "changeErrorMessage":
      return {
        ...state,
        errorMessage: action.data
      };

    case "buildGrid":
      return {
        ...state,
        cells: action.data
      };

    default:
      return state;
  }
};

export const Context = React.createContext({} as IContextProps);
