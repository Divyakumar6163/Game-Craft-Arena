export default class Face {
  constructor(color = null) {
    this.color = color;
  }

  clone() {
    return new Face(this.color);
  }
}
