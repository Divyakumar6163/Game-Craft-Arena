export default class BinaryHeap {
  constructor(compare) {
    this.data = [];
    this.compare = compare;
  }

  isEmpty() {
    return this.data.length === 0;
  }

  size() {
    return this.data.length;
  }

  push(item) {
    this.data.push(item);
    this.bubbleUp(this.data.length - 1);
  }

  pop() {
    if (this.data.length === 1) return this.data.pop();

    const top = this.data[0];

    this.data[0] = this.data.pop();

    this.bubbleDown(0);

    return top;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);

      if (this.compare(this.data[index], this.data[parent]) >= 0) break;

      [this.data[index], this.data[parent]] = [
        this.data[parent],
        this.data[index],
      ];

      index = parent;
    }
  }

  bubbleDown(index) {
    while (true) {
      let left = index * 2 + 1;

      let right = index * 2 + 2;

      let smallest = index;

      if (
        left < this.data.length &&
        this.compare(this.data[left], this.data[smallest]) < 0
      )
        smallest = left;

      if (
        right < this.data.length &&
        this.compare(this.data[right], this.data[smallest]) < 0
      )
        smallest = right;

      if (smallest === index) break;

      [this.data[index], this.data[smallest]] = [
        this.data[smallest],
        this.data[index],
      ];

      index = smallest;
    }
  }
}
