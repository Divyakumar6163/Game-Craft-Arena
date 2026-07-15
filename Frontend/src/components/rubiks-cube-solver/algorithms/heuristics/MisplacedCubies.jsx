import BaseHeuristic from "./BaseHeuristic";

export default class MisplacedCubies extends BaseHeuristic {
  calculate(cube) {
    let misplaced = 0;

    for (const cubie of cube) {
      const [x, y, z] = cubie.position;
      const [hx, hy, hz] = cubie.homePosition;

      if (x !== hx || y !== hy || z !== hz) {
        misplaced++;
      }
    }

    return misplaced;
  }
}
