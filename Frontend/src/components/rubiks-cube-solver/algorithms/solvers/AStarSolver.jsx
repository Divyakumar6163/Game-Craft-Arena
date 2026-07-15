import BaseSolver from "../search/BaseSolver";
import GraphNode from "../graph/GraphNode";
import PriorityQueue from "../graph/PriorityQueue";
import SearchResult from "../search/SearchResults";
import reconstructPath from "../graph/reconstructPath";

import { cubeHash } from "../cubeHash";
import { getNeighbors } from "../getNeighbors";
import { isSolved } from "../isSolved";

import HeuristicFactory from "../heuristics/HeuristicFactory";

export default class AStarSolver extends BaseSolver {
  constructor() {
    super();

    this.heuristic = HeuristicFactory.get("MANHATTAN");
  }

  solve(startCube) {
    this.metrics.reset();

    this.startTimer();

    const open = new PriorityQueue();

    const visited = new Set();

    const root = new GraphNode({
      cube: startCube,

      cost: 0,

      heuristic: this.heuristic.calculate(startCube),
    });

    open.enqueue(root);

    while (!open.isEmpty()) {
      const node = open.dequeue();

      const hash = cubeHash(node.cube);

      if (visited.has(hash)) continue;

      visited.add(hash);

      this.expandNode();

      if (isSolved(node.cube)) {
        this.stopTimer();

        return new SearchResult({
          success: true,

          solution: reconstructPath(node),

          metrics: this.metrics,
        });
      }

      for (const next of getNeighbors(node.cube)) {
        const child = new GraphNode({
          cube: next.cube,

          parent: node,

          move: next.move,

          depth: node.depth + 1,

          cost: node.cost + 1,

          heuristic: this.heuristic.calculate(next.cube),
        });

        this.generateNode();

        open.enqueue(child);
      }
    }

    this.stopTimer();

    return new SearchResult({
      success: false,

      solution: [],

      metrics: this.metrics,
    });
  }
}
