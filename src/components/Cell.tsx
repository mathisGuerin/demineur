import React, { useContext } from "react";
import { Context } from "../reducers/gameReducer";
import "../styles/cell.scss";

export type CellType = {
  index: number;
  bomb: boolean;
  bombsAround: number;
  status: CellStatus;
  coords: { x: number; y: number };
};

export type CellStatus = "untouched" | "flagged" | "dug" | "detonated";

const emojis = {
  untouched: "",
  dug: "",
  flagged: "🚩",
  detonated: "💥"
};

type CellProps = {
  cell: CellType;
  onclick: Function;
};

const cellStyle = (
  status: CellStatus,
  bombsAround: number
): React.CSSProperties => ({
  backgroundColor:
    status === "untouched" || status === "flagged"
      ? "#8bc34a"
      : status === "detonated"
      ? "#e63f10"
      : "#ecaf98",
  color:
    bombsAround === 0 || bombsAround === 1
      ? "green"
      : bombsAround === 2
      ? "#ff5722"
      : "#d00000"
});

export const Cell: React.FunctionComponent<CellProps> = ({ cell, onclick }) => {
  const { store } = useContext(Context);

  return (
    <div
      className="Cell"
      style={cellStyle(cell.status, cell.bombsAround)}
      onClick={ev => {
        ev.preventDefault();
        onclick(ev);
      }}
      onContextMenu={ev => {
        ev.preventDefault();
        onclick(ev);
      }}
    >
      {store.gameHelp && cell.bomb && emojis["detonated"]}
      {emojis[cell.status]}
      {cell.bombsAround > 0 && cell.status === "dug" && cell.bombsAround}
    </div>
  );
};

// Create a cell with bomb and with defaults values
export const withBomb = (): CellType => {
  return {
    index: 0,
    bomb: true,
    bombsAround: 0,
    status: "untouched",
    coords: { x: 0, y: 0 }
  };
};

// Create a cell without bomb and with defaults values
export const withoutBomb = (): CellType => {
  return {
    index: 0,
    bomb: false,
    bombsAround: 0,
    status: "untouched",
    coords: { x: 0, y: 0 }
  };
};
