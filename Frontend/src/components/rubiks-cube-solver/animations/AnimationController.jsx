import AnimationQueue from "./AnimationQueue";
import { animateMove } from "../store/cubeActions";
import useSolverStore from "../store/solverStore";

class AnimationController {
  async play(solution) {
    if (!solution || solution.length === 0) return;

    const store = useSolverStore.getState();

    AnimationQueue.clear();

    AnimationQueue.enqueueMany(solution);

    AnimationQueue.start();

    let index = 0;

    while (!AnimationQueue.isEmpty()) {
      const move = AnimationQueue.dequeue();

      store.setCurrentMove(index);

      await animateMove(move);
      index++;
    }

    store.setCurrentMove(solution.length);

    AnimationQueue.stop();
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default new AnimationController();
