class AnimationEngine {
  animate(duration = 250) {
    return new Promise((resolve) => {
      const start = performance.now();

      const step = (time) => {
        const progress = Math.min((time - start) / duration, 1);

        resolve(progress);

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    });
  }
}

export default new AnimationEngine();
