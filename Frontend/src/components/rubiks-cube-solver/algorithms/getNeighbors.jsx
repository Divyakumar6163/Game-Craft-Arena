import { MOVE_FUNCTIONS } from "./moves";

export function getNeighbors(cube) {
  const neighbors = [];

  for (const move in MOVE_FUNCTIONS) {
    neighbors.push({
      move,

      cube: MOVE_FUNCTIONS[move](cube),
    });
  }

  return neighbors;
}
