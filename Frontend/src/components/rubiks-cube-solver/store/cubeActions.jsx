import CubeController from "../algorithms/controllers/CubeController";

/**
 * Rotate a single move
 * Example:
 * rotate("R")
 * rotate("U'")
 */
export function rotate(move) {
  CubeController.move(move);
}

/**
 * Reset the cube to solved state
 */
export function resetCube() {
  CubeController.reset();
}

/**
 * Generate and apply a random scramble
 * Returns the scramble sequence.
 */
export function scrambleCube(length = 20) {
  return CubeController.scramble(length);
}
