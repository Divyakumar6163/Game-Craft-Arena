import BinaryHeap from "./BinaryHeap";

export default class PriorityQueue {
  constructor() {
    this.heap = new BinaryHeap((a, b) => a.priority - b.priority);
  }

  enqueue(node) {
    this.heap.push(node);
  }

  dequeue() {
    return this.heap.pop();
  }

  isEmpty() {
    return this.heap.isEmpty();
  }
}
