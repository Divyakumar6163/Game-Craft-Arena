import Cube from "cubejs";

export class CubeSolver {
  constructor() {
    this.initialized = false;
  }

  async initialize(onProgress) {
    if (this.initialized) return;

    onProgress?.(20);

    Cube.initSolver();

    this.initialized = true;

    onProgress?.(100);
  }

  async solve(faceletString) {
    console.log("Solver started");
    console.log(faceletString);

    if (!this.initialized) {
      throw new Error("Solver not initialized.");
    }

    const cube = Cube.fromString(faceletString);

    console.log("Cube created");

    const solution = cube.solve();

    console.log("Solution:", solution);

    const moves = solution.split(" ").filter(Boolean);

    return {
      success: true,
      moves,
      moveCount: moves.length,
      error: null,
    };
  }

  static getMoveDescription(move) {
    const descriptions = {
      R: "Right face clockwise",
      "R'": "Right face counter-clockwise",
      R2: "Right face 180°",

      L: "Left face clockwise",
      "L'": "Left face counter-clockwise",
      L2: "Left face 180°",

      U: "Top face clockwise",
      "U'": "Top face counter-clockwise",
      U2: "Top face 180°",

      D: "Bottom face clockwise",
      "D'": "Bottom face counter-clockwise",
      D2: "Bottom face 180°",

      F: "Front face clockwise",
      "F'": "Front face counter-clockwise",
      F2: "Front face 180°",

      B: "Back face clockwise",
      "B'": "Back face counter-clockwise",
      B2: "Back face 180°",
    };

    return descriptions[move] || move;
  }
}
