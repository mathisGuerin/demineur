import {
  buildGrid,
  getCoordinatesByIndex,
  getIndexByCoordinates,
  getAdjacentCells,
  getNumberOfBombsAround
} from "../helpers/grid";

describe("Grid", () => {
  describe("buildGrid", () => {
    test("it build a grid with size*size cells", () => {
      const grid = buildGrid(10, 5);
      expect(grid).toHaveLength(100);
    });
    test("it build a grid with 5 bombs inside", () => {
      const grid = buildGrid(3, 5);
      const bombedCells = grid.filter(cell => cell.bomb);
      expect(bombedCells).toHaveLength(5);
    });
  });

  describe("getCoordinatesByIndex", () => {
    test("it get x:0 y:0 when asking for index 0", () => {
      const cellCoordinates = getCoordinatesByIndex(0, 10);
      expect(cellCoordinates).toMatchObject({ x: 0, y: 0 });
    });

    test("it get the correct coordinates of cell when asking for a specific index", () => {
      const cellCoordinates = getCoordinatesByIndex(12, 10);
      expect(cellCoordinates).toMatchObject({ x: 2, y: 1 });
    });
  });

  describe("getIndexByCoordinates", () => {
    test("it get 0 when asking for index x:0 y:0", () => {
      const cellIndex = getIndexByCoordinates(0, 0, 10);
      expect(cellIndex).toBe(0);
    });

    test("it get the correct cell in the grid when asking for x:3 y:2", () => {
      const cellIndex = getIndexByCoordinates(3, 2, 10);
      expect(cellIndex).toBe(23);
    });
  });

  describe("getAdjacentCells", () => {
    const size = 10;
    const grid = buildGrid(size, 10);
    test("it return the 8 cells around central one", () => {
      const expectedCells = getAdjacentCells(2, 3, size, grid);
      expect(expectedCells).toHaveLength(8);
    });
    test("it return the corrects cells around central one", () => {
      const expectedCells = getAdjacentCells(2, 3, size, grid);
      const centralIndex = getIndexByCoordinates(2, 3, size);
      expect(expectedCells[3].index).toBe(centralIndex - 1);
      expect(expectedCells[4].index).toBe(centralIndex + 1);
    });
    test("it return undefined for some cells if the central one is on the border", () => {
      const expectedCells = getAdjacentCells(0, 0, size, grid);
      expect(expectedCells[0]).toBe(undefined);
      expect(expectedCells[3]).toBe(undefined);
      expect(expectedCells[5]).toBe(undefined);
    });
  });

  describe("getNumberOfBombsAround", () => {
    test("it calculate the number of bombs around (8 for a grid full of bombs)", () => {
      const size = 5;
      const grid = buildGrid(size, 25);
      const expectedCells = getAdjacentCells(1, 1, size, grid);
      const nbBombsAround = getNumberOfBombsAround(expectedCells);
      expect(nbBombsAround).toBe(8);
    });
  });
});
