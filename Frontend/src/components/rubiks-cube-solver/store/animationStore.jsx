import { create } from "zustand";

const useAnimationStore = create((set) => ({
  isAnimating: false,

  axis: null,

  layer: null,

  angle: 0,
  progress: 0,

  clockwise: true,

  startAnimation: (axis, layer, clockwise) =>
    set({
      isAnimating: true,
      axis,
      layer,
      clockwise,
      angle: 0,
      progress: 0,
    }),

  setProgress: (progress) =>
    set({
      progress,
    }),

  setAngle: (angle) =>
    set({
      angle,
    }),

  stopAnimation: () =>
    set({
      isAnimating: false,
      axis: null,
      layer: null,
      angle: 0,
    }),
}));

export default useAnimationStore;
