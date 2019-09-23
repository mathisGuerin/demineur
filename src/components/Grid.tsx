import React, { useContext } from "react";
import { Context } from "../reducers/gameReducer";
import { Cell, CellType, withBomb, withoutBomb } from "./Cell";

export type GridType = Array<CellType>;

export const buildGrid = (size: number, minesCount: number): GridType => {
  let cells: GridType = [];
  const numberOfCells = size * size;
  for (let i = 0; i < numberOfCells; i++) {
    const cell = minesCount > i ? withBomb() : withoutBomb();
    cells.push(cell);
  }
  let index = -1;
  while (++index < numberOfCells) {
    const rand = index + Math.floor(Math.random() * (numberOfCells - index));
    const cell = cells[rand];

    cells[rand] = cells[index];
    cells[index] = cell;
  }
  return cells;
};

export const Grid: React.FunctionComponent = props => {
  const { store, dispatch } = useContext(Context);

  const handleClick = (index: number, button: number) => {
    console.log("PROPS", props);
    //updateGridCellStatus(index, button === 0 ? "dig" : "flag");
  };

  const gridStyle = (size: number): React.CSSProperties => ({
    display: "flex",
    border: "1px solid black",
    boxSizing: "content-box",
    flexWrap: "wrap",
    width: `calc(40px * ${size})`,
    margin: "0 auto"
  });

  return (
    <React.Fragment>
      <div style={gridStyle(store.size)}>
        {store.cells.map((cell, index) => {
          return (
            <Cell
              key={index}
              cell={cell}
              onclick={(ev: MouseEvent) => handleClick(index, ev.button)}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Grid;
