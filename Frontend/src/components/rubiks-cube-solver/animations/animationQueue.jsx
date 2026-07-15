class AnimationQueue {
  constructor() {
    this.queue = [];
    this.running = false;
  }

  enqueue(move) {
    this.queue.push(move);
  }

  // NEW
  enqueueMany(moves) {
    this.queue.push(...moves);
  }

  dequeue() {
    return this.queue.shift();
  }

  // NEW
  peek() {
    return this.queue[0];
  }

  // NEW
  size() {
    return this.queue.length;
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  clear() {
    this.queue = [];
  }

  // NEW
  start() {
    this.running = true;
  }

  // NEW
  stop() {
    this.running = false;
  }

  // NEW
  isRunning() {
    return this.running;
  }
}

export default new AnimationQueue();
