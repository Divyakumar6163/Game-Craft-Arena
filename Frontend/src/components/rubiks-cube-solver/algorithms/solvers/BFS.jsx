import BaseSolver from "../search/BaseSolver";
import GraphNode from "../graph/GraphNode";
import Queue from "../graph/Queue";

import SearchResult from "../search/SearchResults";

import { cubeHash } from "../cubeHash";
import { getNeighbors } from "../getNeighbors";
import { isSolved } from "../isSolved";
import reconstructPath from "../graph/reconstructPath";

export default class BreadthFirstSolver extends BaseSolver {
  solve(startCube, maxDepth = 7) {
    this.metrics.reset();

    this.startTimer();

    const queue = new Queue();

    const visited = new Set();

    const root = new GraphNode({
      cube: startCube,
    });

    queue.enqueue(root);

    visited.add(cubeHash(startCube));

    while (!queue.isEmpty()) {
      const node = queue.dequeue();

      this.expandNode();

      this.updateDepth(node.depth);

      if (isSolved(node.cube)) {
        this.stopTimer();

        return new SearchResult({
          success: true,

          solution: reconstructPath(node),

          metrics: this.metrics,
        });
      }

      if (node.depth >= maxDepth) continue;

      for (const next of getNeighbors(node.cube)) {
        const hash = cubeHash(next.cube);

        if (visited.has(hash)) continue;

        visited.add(hash);

        this.visitNode();

        this.generateNode();

        queue.enqueue(
          new GraphNode({
            cube: next.cube,

            parent: node,

            move: next.move,

            depth: node.depth + 1,
          }),
        );
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
