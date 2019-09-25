import { isDefeated, isVictorious } from "../helpers/rules";
import { buildGrid } from "../helpers/grid";

describe("Rules", () => {
  test("a new game is neither lost or won", () => {
    const grid = buildGrid(10, 10);
    expect(isDefeated(grid)).toBe(false);
    expect(isVictorious(grid)).toBe(false);
  });

  test("a game is lost if a cell with a bomb has been dug", () => {
    const grid = buildGrid(1, 1);
    expect(isDefeated(grid)).toBe(false);
    expect(isVictorious(grid)).toBe(true);
  });

  test("a game is won if every cell without bomb has been dug", () => {
    const grid = buildGrid(1, 0);
    expect(isDefeated(grid)).toBe(false);
    expect(isVictorious(grid)).toBe(false);
  });
});
