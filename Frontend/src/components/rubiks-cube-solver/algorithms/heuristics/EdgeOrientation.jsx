import BaseHeuristic from "./BaseHeuristic";

export default class EdgeOrientation extends BaseHeuristic {
  calculate(cube) {
    let score = 0;

    for (const cubie of cube) {
      if (cubie.type !== "edge") continue;

      if (
        JSON.stringify(cubie.position) !== JSON.stringify(cubie.homePosition)
      ) {
        score++;
      }
    }

    return score;
  }
}
