import Cubie from "./Cubie";

export default class CubeModel {
  constructor(cubies) {
    this.cubies = cubies.map((cubie) => new Cubie(cubie));
  }

  clone() {
    return new CubeModel(this.cubies.map((cubie) => cubie.clone()));
  }

  getCubies() {
    return this.cubies;
  }
}
