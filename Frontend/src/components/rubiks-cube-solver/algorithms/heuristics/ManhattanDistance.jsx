import BaseHeuristic from "./BaseHeuristic";

export default class ManhattanDistance extends BaseHeuristic {
  calculate(cube) {
    let distance = 0;

    for (const cubie of cube) {
      const [x, y, z] = cubie.position;
      const [hx, hy, hz] = cubie.homePosition;

      distance += Math.abs(x - hx);

      distance += Math.abs(y - hy);

      distance += Math.abs(z - hz);
    }

    return distance;
  }
}
