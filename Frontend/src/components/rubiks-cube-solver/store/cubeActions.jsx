import CubeController from "../algorithms/controllers/CubeController";
import MoveAnimator from "../animations/MoveAnimator";

/**
 * Rotate a single move
 * Example:
 * rotate("R")
 * rotate("U'")
 */

export async function animateMove(move) {
  await MoveAnimator.animate(move);

  rotate(move);
}
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
