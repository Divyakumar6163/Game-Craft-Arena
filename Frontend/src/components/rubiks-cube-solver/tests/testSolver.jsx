import { createSolvedCube } from "../algorithms/cubeState";
import { applyMoves } from "../algorithms/applyMoves";
import SolverFactory from "../algorithms/SolverFactory";
import { generateScramble } from "../algorithms/scramble";
export function testSolver() {
  console.clear();

  // Create solved cube
  const cube = createSolvedCube();

  // Scramble it with a small sequence
  //   const scramble = generateScramble(6);
  const scramble = ["R", "U", "F", "L", "D", "B"];
  const scrambledCube = applyMoves(cube, scramble);

  console.log("Scramble:", scramble.join(" "));

  // BFS
  //   const solver = SolverFactory.getSolver("BFS");
  //   const result = solver.solve(scrambledCube, 4);

  //Bidirectional BFS
  //   const solver = SolverFactory.getSolver("BIDIRECTIONAL");
  //   const result = solver.solve(scrambledCube, createSolvedCube());

  //A* Algo
  const solver = SolverFactory.getSolver("ASTAR");
  const result = solver.solve(scrambledCube, createSolvedCube());

  console.log(result);

  if (result.success) {
    console.log("Solution:", result.solution.join(" "));
    console.log("Expanded:", result.metrics.expandedNodes);
    console.log("Time:", result.metrics.executionTime, "ms");
  } else {
    console.log("No solution found.");
  }
}
