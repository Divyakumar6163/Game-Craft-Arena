import BaseSolver from "../search/BaseSolver";
import GraphNode from "../graph/GraphNode";
import SearchResult from "../search/SearchResults";

import SearchFrontier from "../graph/SearchFrontier";

import mergePaths from "../graph/mergePaths";

import { getNeighbors } from "../getNeighbors";

import { cubeHash } from "../cubeHash";

export default class BidirectionalSolver extends BaseSolver {
  solve(startCube, goalCube) {
    console.log("Start cube:", startCube);
    console.log("Goal cube:", goalCube);
    this.metrics.reset();

    this.startTimer();

    const forward = new SearchFrontier(startCube);

    const backward = new SearchFrontier(goalCube);

    while (!forward.isEmpty() && !backward.isEmpty()) {
      const result = this.expandFrontier(forward, backward);

      if (result) {
        this.stopTimer();

        return new SearchResult({
          success: true,

          solution: result,

          metrics: this.metrics,
        });
      }

      const reverseResult = this.expandFrontier(backward, forward);

      if (reverseResult) {
        this.stopTimer();

        return new SearchResult({
          success: true,

          solution: reverseResult,

          metrics: this.metrics,
        });
      }
    }

    this.stopTimer();

    return new SearchResult({
      success: false,

      solution: [],

      metrics: this.metrics,
    });
  }

  expandFrontier(current, other) {
    const node = current.dequeue();

    this.expandNode();

    for (const next of getNeighbors(node.cube)) {
      const hash = cubeHash(next.cube);

      if (current.contains(hash)) continue;

      const child = new GraphNode({
        cube: next.cube,
        parent: node,
        move: next.move,
        depth: node.depth + 1,
      });

      current.enqueue(child);

      this.generateNode();

      if (other.contains(hash)) {
        return mergePaths(
          child,

          other.get(hash),
        );
      }
    }

    return null;
  }
}
