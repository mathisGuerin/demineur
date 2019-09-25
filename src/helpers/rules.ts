import { GridType } from "../components/Grid";

// While no cell is 'detonated', the game is not lost
export const isDefeated = (cells: GridType) => {
  for (let cell of cells) {
    if (cell.status === "detonated") return true;
  }
  return false;
};

// While all cells not containing a bomb have not been dug
// the game is not won
export const isVictorious = (cells: GridType) => {
  for (let cell of cells) {
    if (
      (cell.status !== "dug" && cell.bomb === false) ||
      cell.status === "detonated"
    ) {
      return false;
    }
  }
  return true;
};
