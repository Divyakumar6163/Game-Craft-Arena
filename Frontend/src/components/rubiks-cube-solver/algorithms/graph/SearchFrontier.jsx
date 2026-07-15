import Queue from "./Queue";
import GraphNode from "./GraphNode";
import { cubeHash } from "../cubeHash";

export default class SearchFrontier {
  constructor(startCube) {
    this.queue = new Queue();

    this.visited = new Map();

    const root = new GraphNode({
      cube: startCube,
    });

    const hash = cubeHash(startCube);

    this.queue.enqueue(root);

    this.visited.set(hash, root);
  }

  enqueue(node) {
    const hash = cubeHash(node.cube);

    this.queue.enqueue(node);

    this.visited.set(hash, node);
  }

  dequeue() {
    return this.queue.dequeue();
  }

  isEmpty() {
    return this.queue.isEmpty();
  }

  contains(hash) {
    return this.visited.has(hash);
  }

  get(hash) {
    return this.visited.get(hash);
  }
}
