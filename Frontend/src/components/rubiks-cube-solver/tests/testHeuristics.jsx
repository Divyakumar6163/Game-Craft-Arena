import { createSolvedCube } from "../algorithms/cubeState";

import { applyMoves } from "../algorithms/applyMoves";

import HeuristicFactory from "../algorithms/heuristics/HeuristicFactory";

export function testHeuristics() {
  const cube = applyMoves(createSolvedCube(), ["R", "U", "F"]);

  const misplaced = HeuristicFactory.get("MISPLACED");

  const manhattan = HeuristicFactory.get("MANHATTAN");

  console.log("Misplaced:", misplaced.calculate(cube));

  console.log("Manhattan:", manhattan.calculate(cube));
}
