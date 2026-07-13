import { create } from "zustand";

const useHistoryStore = create((set) => ({
  moves: [],

  addMove: (move) =>
    set((state) => ({
      moves: [...state.moves, move],
    })),

  clearHistory: () =>
    set({
      moves: [],
    }),
}));

export default useHistoryStore;
