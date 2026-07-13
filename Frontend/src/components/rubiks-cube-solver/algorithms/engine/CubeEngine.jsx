import { createSolvedCube } from "../cubeState";

class CubeEngine {
  constructor() {
    this.cubies = createSolvedCube();
  }

  getState() {
    return this.cubies;
  }

  setState(cubies) {
    this.cubies = cubies;
  }

  reset() {
    this.cubies = createSolvedCube();
  }

  move(moveName) {
    console.log(`Move: ${moveName}`);
  }

  scramble() {}

  solve() {}
}

export default CubeEngine;
