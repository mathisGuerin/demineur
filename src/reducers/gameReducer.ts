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
    case "UPDATE_SIZE":
      return {
        ...state,
        size: action.data
      };

    case "UPDATE_BOMBS":
      return {
        ...state,
        bombs: action.data
      };

    case "UPDATE_GAME_READY":
      return {
        ...state,
        isGameReady: !state.isGameReady
      };

    case "UPDATE_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: action.data
      };

    case "CREATE_GRID":
      return {
        ...state,
        cells: action.data
      };

    case "DIG":
      return {
        ...state,
        cells: action.data
      };

    case "FLAG":
      return {
        ...state,
        cells: state.cells.map(cell => {
          return cell.index === action.data
            ? {
                ...cell,
                status:
                  cell.status === "flagged"
                    ? "untouched"
                    : cell.status === "dug"
                    ? "dug"
                    : "flagged"
              }
            : cell;
        })
      };
    default:
      return state;
  }
};

export const Context = React.createContext({} as IContextProps);
