import BreadthFirstSolver from "./solvers/BidirectionalBFS";
import BidirectionalSolver from "./solvers/BidirectionalBFS";
import AStarSolver from "./solvers/AStarSolver";
class SolverFactory {
  constructor() {
    this.solvers = {
      BFS: new BreadthFirstSolver(),
      BIDIRECTIONAL: new BidirectionalSolver(),
      ASTAR: new AStarSolver(),
    };
  }

  getSolver(name) {
    return this.solvers[name];
  }
}

export default new SolverFactory();
