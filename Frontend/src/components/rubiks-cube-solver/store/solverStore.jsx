import { create } from "zustand";

const useSolverStore = create((set) => ({
  algorithm: "IDA*",

  solving: false,

  solution: [],

  solveTime: 0,

  expandedNodes: 0,

  setAlgorithm: (algorithm) => set({ algorithm }),

  setSolving: (solving) => set({ solving }),

  setSolution: (solution) => set({ solution }),

  setSolveTime: (solveTime) => set({ solveTime }),

  setExpandedNodes: (expandedNodes) => set({ expandedNodes }),
}));

export default useSolverStore;
