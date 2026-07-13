export async function animateRotation(setter, speed = 4) {
  return new Promise((resolve) => {
    let angle = 0;

    function step() {
      angle += speed;

      setter(angle);

      if (angle >= 90) {
        setter(90);

        resolve();

        return;
      }

      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  });
}
