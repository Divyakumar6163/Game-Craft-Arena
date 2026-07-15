export default class GraphNode {
  constructor({
    cube,
    parent = null,
    move = null,
    depth = 0,
    cost = 0,
    heuristic = 0,
  }) {
    this.cube = cube;
    this.parent = parent;
    this.move = move;

    this.depth = depth;

    // g(n)
    this.cost = cost;

    // h(n)
    this.heuristic = heuristic;
  }

  get priority() {
    return this.cost + this.heuristic;
  }
}
