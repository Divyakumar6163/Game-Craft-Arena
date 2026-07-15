import SearchMetrics from "./SearchMetrics";

export default class BaseSolver {
  constructor() {
    this.metrics = new SearchMetrics();
  }

  startTimer() {
    this.startTime = performance.now();
  }

  stopTimer() {
    this.metrics.executionTime = performance.now() - this.startTime;
  }

  expandNode() {
    this.metrics.expandedNodes++;
  }

  generateNode() {
    this.metrics.generatedNodes++;
  }

  visitNode() {
    this.metrics.visitedNodes++;
  }

  updateDepth(depth) {
    this.metrics.maxDepth = Math.max(this.metrics.maxDepth, depth);
  }
}
