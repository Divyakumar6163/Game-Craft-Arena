import useAnimationStore from "../store/animationStore";

export async function animateMove(info) {
  const store = useAnimationStore.getState();

  store.startAnimation(info.axis, info.layer, info.clockwise);

  let angle = 0;

  while (angle < 90) {
    angle += 3;

    store.setAngle(angle);

    await new Promise((resolve) => requestAnimationFrame(resolve));
  }

  store.stopAnimation();
}
