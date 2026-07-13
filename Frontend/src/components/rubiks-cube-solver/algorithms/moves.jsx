import { rotateLayer } from "./moveEngine";

export const MOVE_FUNCTIONS = {
  R: (cube) => rotateLayer(cube, "x", 1, true),
  "R'": (cube) => rotateLayer(cube, "x", 1, false),

  L: (cube) => rotateLayer(cube, "x", -1, false),
  "L'": (cube) => rotateLayer(cube, "x", -1, true),

  U: (cube) => rotateLayer(cube, "y", 1, true),
  "U'": (cube) => rotateLayer(cube, "y", 1, false),

  D: (cube) => rotateLayer(cube, "y", -1, false),
  "D'": (cube) => rotateLayer(cube, "y", -1, true),

  F: (cube) => rotateLayer(cube, "z", 1, true),
  "F'": (cube) => rotateLayer(cube, "z", 1, false),

  B: (cube) => rotateLayer(cube, "z", -1, false),
  "B'": (cube) => rotateLayer(cube, "z", -1, true),
};
