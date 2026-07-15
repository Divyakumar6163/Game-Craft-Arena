import SearchStrategy from "./SearchStrategy";

import Queue from "../graph/Queue";

export default class BFSStrategy extends SearchStrategy {
  createOpenSet() {
    return new Queue();
  }

  add(queue, node) {
    queue.enqueue(node);
  }

  remove(queue) {
    return queue.dequeue();
  }
}
