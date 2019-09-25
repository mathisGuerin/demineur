import {
  buildGrid,
  getCoordinatesByIndex,
  getIndexByCoordinates,
  getAdjacentCells,
  getNumberOfBombsAround
} from "../helpers/grid";

describe("Grid", () => {
  describe("getCoordinatesByIndex", () => {
    test("it get x:0 y:0 when asking for index 0", () => {
      const cellCoordinates = getCoordinatesByIndex(0, 10);
      expect(cellCoordinates).toMatchObject({ x: 0, y: 0 });
    });

    test("it get the last cell in grid when asking for x:3 y:1", () => {
      const cellCoordinates = getCoordinatesByIndex(12, 10);
      expect(cellCoordinates).toMatchObject({ x: 2, y: 1 });
    });
  });

  describe("getIndexByCoordinates", () => {
    test("it get 0 when asking for index x:0 y:0", () => {
      const cellIndex = getIndexByCoordinates(0, 0, 10);
      expect(cellIndex).toBe(0);
    });

    test("it get the last cell in grid when asking for x:3 y:1", () => {
      const cellIndex = getIndexByCoordinates(3, 2, 10);
      expect(cellIndex).toBe(23);
    });
  });

  describe("getAdjacentCells", () => {
    test("it return the 8 cells around central one", () => {
      const size = 10;
      const grid = buildGrid(size, 10);
      const expectedCells = getAdjacentCells(2, 3, size, grid);
      expect(expectedCells).toHaveLength(8);
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
