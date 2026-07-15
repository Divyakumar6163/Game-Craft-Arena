import useAnimationStore from "../store/animationStore";

class MoveAnimator {
  async animate(move) {
    const store = useAnimationStore.getState();

    if (store.isAnimating) return;

    const config = this.getMoveConfig(move);

    if (!config) return;

    store.startAnimation(config.axis, config.layer, config.clockwise);

    await this.animateRotation();

    store.stopAnimation();
  }

  animateRotation() {
    return new Promise((resolve) => {
      const store = useAnimationStore.getState();

      const duration = 250;
      const start = performance.now();

      const step = (time) => {
        const progress = Math.min((time - start) / duration, 1);

        const eased = this.ease(progress);

        store.setAngle(eased * 90);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          resolve();
        }
      };

      requestAnimationFrame(step);
    });
  }

  ease(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  getMoveConfig(move) {
    const clockwise = !move.includes("'");

    switch (move[0]) {
      case "R":
        return {
          axis: "x",
          layer: 1,
          clockwise,
        };

      case "L":
        return {
          axis: "x",
          layer: -1,
          clockwise: !clockwise,
        };

      case "U":
        return {
          axis: "y",
          layer: 1,
          clockwise,
        };

      case "D":
        return {
          axis: "y",
          layer: -1,
          clockwise: !clockwise,
        };

      case "F":
        return {
          axis: "z",
          layer: 1,
          clockwise,
        };

      case "B":
        return {
          axis: "z",
          layer: -1,
          clockwise: !clockwise,
        };

      default:
        return null;
    }
  }
}

export default new MoveAnimator();
