import React, { useContext, useEffect } from "react";
import { Context } from "../reducers/gameReducer";
import { Cell, CellType } from "./Cell";
import "../styles/grid.scss";
import {
  getAdjacentCells,
  getCoordinatesByIndex,
  getIndexByCoordinates,
  getNumberOfBombsAround
} from "../helpers/grid";

export type GridType = Array<CellType>;

export const Grid: React.FunctionComponent = props => {
  const { store, dispatch } = useContext(Context);

  const handleClick = (index: number, button: number) => {
    if (button === 0) {
      // Create a copy of cells from the store
      const cellsToUpdate = store.cells;
      // Update cells
      dig(index, cellsToUpdate);
      // Update the store with updated cells
      dispatch({ type: "DIG", data: cellsToUpdate });
    } else {
      dispatch({ type: "FLAG", data: index });
    }
  };

  const dig = (index: number, cells: CellType[]) => {
    // We need to calculates coordinates of the cells
    const coords = getCoordinatesByIndex(index, store.size);
    // Then we get 8 cells around the central one
    const adjacentCells = getAdjacentCells(
      coords.x,
      coords.y,
      store.size,
      cells
    );
    // Calculate number of bombs around the central cell
    const bombsAround = getNumberOfBombsAround(adjacentCells);
    cells[index].bombsAround = bombsAround;

    // if selected cell contains a bomb, it exploses
    if (cells[index].bomb) {
      cells[index].status = "detonated";
    } else {
      cells[index].status = "dug";
      if (bombsAround === 0) {
        // if there are no bombs arounds, we get all the index of adjacents cells
        adjacentCells.map(cell => {
          if (cell !== undefined) {
            const index = getIndexByCoordinates(
              cell.coords.x,
              cell.coords.y,
              store.size
            );
            // if they are not already dug,
            //we dig recursively until all adjacents cells are close to a bomb
            if (cells[index].status !== "dug") {
              dig(index, cells);
            }
          }
        });
      }
    }
  };

  const gridStyle = (size: number): React.CSSProperties => ({
    width: `calc(40px * ${size})`
  });

  return (
    <React.Fragment>
      <div className="Grid" style={gridStyle(store.size)}>
        {store.cells.map(cell => {
          return (
            <Cell
              key={cell.index}
              cell={cell}
              onclick={(ev: MouseEvent) => handleClick(cell.index, ev.button)}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Grid;
