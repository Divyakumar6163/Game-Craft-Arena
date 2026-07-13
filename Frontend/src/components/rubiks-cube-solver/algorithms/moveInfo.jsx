export const MOVE_INFO = {
  R: { axis: "x", layer: 1, clockwise: true },
  "R'": { axis: "x", layer: 1, clockwise: false },

  L: { axis: "x", layer: -1, clockwise: false },
  "L'": { axis: "x", layer: -1, clockwise: true },

  U: { axis: "y", layer: 1, clockwise: true },
  "U'": { axis: "y", layer: 1, clockwise: false },

  D: { axis: "y", layer: -1, clockwise: false },
  "D'": { axis: "y", layer: -1, clockwise: true },

  F: { axis: "z", layer: 1, clockwise: true },
  "F'": { axis: "z", layer: 1, clockwise: false },

  B: { axis: "z", layer: -1, clockwise: false },
  "B'": { axis: "z", layer: -1, clockwise: true },
};
