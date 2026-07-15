import BaseHeuristic from "./BaseHeuristic";

export default class CornerOrientation extends BaseHeuristic {
  calculate(cube) {
    let score = 0;

    for (const cubie of cube) {
      if (cubie.type !== "corner") continue;

      if (
        JSON.stringify(cubie.position) !== JSON.stringify(cubie.homePosition)
      ) {
        score++;
      }
    }

    return score;
  }
}
