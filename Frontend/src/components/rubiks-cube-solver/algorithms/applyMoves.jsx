import { MOVE_FUNCTIONS } from "./moves";

export function applyMove(cube, move) {
  const fn = MOVE_FUNCTIONS[move];

  if (!fn) return cube;

  return fn(cube);
}

export function applyMoves(cube, moves) {
  let current = cube;

  for (const move of moves) {
    current = applyMove(current, move);
  }

  return current;
}
