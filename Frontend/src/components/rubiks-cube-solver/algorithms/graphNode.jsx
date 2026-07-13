export default class GraphNode {
  constructor(cube, parent = null, move = null, depth = 0, cost = 0) {
    this.cube = cube;

    this.parent = parent;

    this.move = move;

    this.depth = depth;

    this.cost = cost;
  }
}
