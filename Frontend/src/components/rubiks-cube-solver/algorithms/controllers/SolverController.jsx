import SolverFactory from "../../algorithms/SolverFactory";
import { createSolvedCube } from "../../algorithms/cubeState";
import useSolverStore from "../../store/solverStore";
import useCubeStore from "../../store/cubeStore";
import AnimationController from "../../animations/AnimationController";
class SolverController {
  solve(algorithm) {
    console.log("Algo: ", algorithm);

    const solverStore = useSolverStore.getState();
    const cubeStore = useCubeStore.getState();

    solverStore.setSolving(true);
    solverStore.clearSolution();

    try {
      const cube = cubeStore.cubies;
      console.log("Cube:", cube);
      console.log("Cubies length:", cube?.length);
      const solver = SolverFactory.getSolver(algorithm);

      if (!solver) {
        throw new Error(`Solver "${algorithm}" not found.`);
      }

      const result = solver.solve(cube, createSolvedCube());

      solverStore.setSolution(result.solution || []);
      AnimationController.play(result.solution || []);
      if (result.metrics) {
        solverStore.setSolveTime(result.metrics.executionTime || 0);

        solverStore.setExpandedNodes(result.metrics.expandedNodes || 0);

        solverStore.setGeneratedNodes(result.metrics.generatedNodes || 0);

        solverStore.setMaxDepth(result.metrics.maxDepth || 0);
      }

      return result;
    } catch (error) {
      console.error("Solver Error:", error);
      return null;
    } finally {
      solverStore.setSolving(false);
    }
  }
}

export default new SolverController();
