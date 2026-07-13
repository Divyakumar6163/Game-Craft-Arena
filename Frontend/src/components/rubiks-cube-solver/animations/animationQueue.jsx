class AnimationQueue {
  constructor() {
    this.queue = [];

    this.running = false;
  }

  enqueue(move) {
    this.queue.push(move);
  }

  dequeue() {
    return this.queue.shift();
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  clear() {
    this.queue = [];
  }
}

export default new AnimationQueue();
