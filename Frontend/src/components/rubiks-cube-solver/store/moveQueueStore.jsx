import { create } from "zustand";

const useMoveQueueStore = create((set, get) => ({
  queue: [],

  running: false,

  addMove: (move) =>
    set((state) => ({
      queue: [...state.queue, move],
    })),

  addMoves: (moves) =>
    set((state) => ({
      queue: [...state.queue, ...moves],
    })),

  popMove: () => {
    const { queue } = get();

    if (queue.length === 0) return null;

    const move = queue[0];

    set({
      queue: queue.slice(1),
    });

    return move;
  },

  clearQueue: () =>
    set({
      queue: [],
    }),

  setRunning: (running) =>
    set({
      running,
    }),
}));

export default useMoveQueueStore;
