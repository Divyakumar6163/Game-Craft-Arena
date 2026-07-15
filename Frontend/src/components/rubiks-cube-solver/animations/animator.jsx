import AnimationQueue from "./AnimationQueue";

class Animator {
  async play(callback) {
    if (AnimationQueue.running) return;

    AnimationQueue.running = true;

    while (!AnimationQueue.isEmpty()) {
      const move = AnimationQueue.dequeue();

      await callback(move);
    }

    AnimationQueue.running = false;
  }
}

export default new Animator();
