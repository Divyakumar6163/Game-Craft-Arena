import { create } from "zustand";

const useSolverStore = create((set) => ({
  // Selected algorithm
  algorithm: "ASTAR",

  // Is solver currently running
  solving: false,

  // Solution moves
  solution: [],

  // Statistics
  solveTime: 0,
  expandedNodes: 0,
  generatedNodes: 0,
  maxDepth: 0,

  // Animation
  currentMove: 0,
  playbackSpeed: 1,

  // Actions
  setAlgorithm: (algorithm) => set({ algorithm }),

  setSolving: (solving) => set({ solving }),

  setSolution: (solution) => set({ solution }),

  setSolveTime: (solveTime) => set({ solveTime }),

  setExpandedNodes: (expandedNodes) => set({ expandedNodes }),

  setGeneratedNodes: (generatedNodes) => set({ generatedNodes }),

  setMaxDepth: (maxDepth) => set({ maxDepth }),

  setCurrentMove: (currentMove) => set({ currentMove }),

  setPlaybackSpeed: (playbackSpeed) => set({ playbackSpeed }),

  clearSolution: () =>
    set({
      solution: [],
      solveTime: 0,
      expandedNodes: 0,
      generatedNodes: 0,
      maxDepth: 0,
      currentMove: 0,
    }),
}));

export default useSolverStore;
