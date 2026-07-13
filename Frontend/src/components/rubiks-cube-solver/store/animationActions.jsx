import AnimationQueue from "../animations/animationQueue";
import Animator from "../animations/animator";

import { rotate } from "./cubeActions";

export async function animateMove(move) {
  AnimationQueue.enqueue(move);

  await Animator.play(async (currentMove) => {
    rotate(currentMove);

    await new Promise((resolve) => setTimeout(resolve, 300));
  });
}
