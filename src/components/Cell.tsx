import React from "react";

export type CellType = {
  bomb: boolean;
  flagged: boolean;
  dug: boolean;
  bombsAround: number;
  status: CellStatus;
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
  fontFamily: "Helvetica, Arial",
  width: "40px",
  height: "40px",
  textAlign: "center",
  lineHeight: "40px",
  border: "1px solid black",
  boxSizing: "border-box",
  cursor: "pointer",
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
      : "#d00000",
  fontWeight: "bold",
  fontSize: "28px",
  transition: "all ease-in-out 200ms"
});

export const Cell: React.FunctionComponent<CellProps> = ({ cell, onclick }) => {
  return (
    <div
      onClick={ev => {
        ev.preventDefault();
        onclick(ev);
      }}
      onContextMenu={ev => {
        ev.preventDefault();
        onclick(ev);
      }}
      style={cellStyle(cell.status, cell.bombsAround)}
    >
      {emojis[cell.status]}
      {cell.bombsAround > 0 && cell.status === "dug" && cell.bombsAround}
    </div>
  );
};

export const withBomb = (): CellType => {
  return {
    bomb: true,
    flagged: false,
    dug: false,
    bombsAround: 0,
    status: "untouched"
  };
};

export const withoutBomb = (): CellType => {
  return {
    bomb: false,
    flagged: false,
    dug: false,
    bombsAround: 0,
    status: "untouched"
  };
};
