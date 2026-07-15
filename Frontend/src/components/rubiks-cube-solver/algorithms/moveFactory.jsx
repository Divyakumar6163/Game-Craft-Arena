import Move from "./CubeModel/Move";

export const MOVE_FACTORY = {
  R: new Move("R", "x", 1, true),

  "R'": new Move("R'", "x", 1, false),

  L: new Move("L", "x", -1, false),

  "L'": new Move("L'", "x", -1, true),

  U: new Move("U", "y", 1, true),

  "U'": new Move("U'", "y", 1, false),

  D: new Move("D", "y", -1, false),

  "D'": new Move("D'", "y", -1, true),

  F: new Move("F", "z", 1, true),

  "F'": new Move("F'", "z", 1, false),

  B: new Move("B", "z", -1, false),

  "B'": new Move("B'", "z", -1, true),
};
