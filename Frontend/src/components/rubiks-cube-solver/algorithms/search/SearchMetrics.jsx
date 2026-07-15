export default class SearchMetrics {
  constructor() {
    this.expandedNodes = 0;
    this.generatedNodes = 0;
    this.visitedNodes = 0;
    this.maxDepth = 0;
    this.executionTime = 0;
  }

  reset() {
    this.expandedNodes = 0;
    this.generatedNodes = 0;
    this.visitedNodes = 0;
    this.maxDepth = 0;
    this.executionTime = 0;
  }
}
