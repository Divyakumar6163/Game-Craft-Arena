import SearchStrategy from "./SearchStrategy";

import PriorityQueue from "../graph/PriorityQueue";

export default class AStarStrategy extends SearchStrategy {
  createOpenSet() {
    return new PriorityQueue();
  }

  add(queue, node) {
    queue.enqueue(node);
  }

  remove(queue) {
    return queue.dequeue();
  }
}
