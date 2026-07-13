import { create } from "zustand";
import { createSolvedCube } from "../algorithms/cubeState";

const useCubeStore = create((set) => ({
  // Current cube
  cubies: createSolvedCube(),

  // Selected algorithm
  algorithm: "IDA*",

  // Is animation running?
  isAnimating: false,

  // Animation speed
  speed: 1,

  // Current move index
  currentMove: 0,

  // Current solution
  solution: [],

  // Replace cube
  setCube: (cubies) =>
    set({
      cubies,
    }),

  // Reset
  resetCube: () =>
    set({
      cubies: createSolvedCube(),
      solution: [],
      currentMove: 0,
    }),

  setSolution: (solution) =>
    set({
      solution,
    }),

  setCurrentMove: (index) =>
    set({
      currentMove: index,
    }),

  setAnimating: (value) =>
    set({
      isAnimating: value,
    }),

  setSpeed: (speed) =>
    set({
      speed,
    }),

  setAlgorithm: (algorithm) =>
    set({
      algorithm,
    }),
}));

export default useCubeStore;
