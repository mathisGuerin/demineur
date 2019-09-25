import { withBomb, withoutBomb } from "../components/Cell";
import { GridType } from "../components/Grid";
import { CellType } from "../components/Cell";

// Create a grid (an array of cells)
export const buildGrid = (size: number, minesCount: number): GridType => {
  let cells: GridType = [];
  const numberOfCells = size * size;
  // Add {mineCount} cells with bombs on the array
  // then fill the array with cells withount bombs
  for (let i = 0; i < numberOfCells; i++) {
    const cell = minesCount > i ? withBomb() : withoutBomb();
    cells.push(cell);
  }
  let index = -1;
  while (++index < numberOfCells) {
    const rand = index + Math.floor(Math.random() * (numberOfCells - index));
    // Mix randomly bombed and not bombed cells
    const cell = cells[rand];
    cells[rand] = cells[index];
    // Add the index to the cell
    cell.index = index;
    cells[index] = cell;
  }
  return cells;
};

export const startGame = (size: number, bombs: number) => {
  var cells = buildGrid(size, bombs);
  return {
    type: "CREATE_GRID",
    data: cells
  };
};

// Get coordinates of a cell by its index
export const getCoordinatesByIndex = (
  index: number,
  size: number
): { x: number; y: number } => {
  const x = index % size;
  const y = Math.trunc(index / size);
  return { x, y };
};

// Get coordinates of a cell by its index
export const getIndexByCoordinates = (
  x: number,
  y: number,
  size: number
): number => {
  return y * size + x;
};

// Get 8 cells around central one
export const getAdjacentCells = (
  x: number,
  y: number,
  size: number,
  cells: GridType
): Array<CellType | undefined> => {
  const adjacentCells: Array<CellType | undefined> = [];
  for (let row = y - 1; row <= y + 1; row++) {
    for (let col = x - 1; col <= x + 1; col++) {
      if (row !== y || col !== x) {
        const cell = cellByCoodinates(col, row, size, cells);
        if (cell !== undefined) {
          cell.coords = { x: col, y: row };
        }
        adjacentCells.push(cell);
      }
    }
  }
  return adjacentCells;
};

// Get number of bombs from an array of cells
export const getNumberOfBombsAround = (
  adjacentCells: Array<CellType | undefined>
) => {
  return adjacentCells.filter(cell => (cell !== undefined ? cell.bomb : false))
    .length;
};

// Get a cell with its coordinates
export const cellByCoodinates = (
  x: number,
  y: number,
  size: number,
  cells: GridType
): CellType | undefined => {
  if (x < 0 || y < 0 || x >= size) {
    return undefined;
  } else return cells[size * y + x];
};
