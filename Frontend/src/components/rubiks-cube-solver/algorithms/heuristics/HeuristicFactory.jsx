import MisplacedCubies from "./MisplacedCubies";
import ManhattanDistance from "./ManhattanDistance";
import CornerOrientation from "./CornerOrientation";
import EdgeOrientation from "./EdgeOrientation";

class HeuristicFactory {
  constructor() {
    this.heuristics = {
      MISPLACED: new MisplacedCubies(),

      MANHATTAN: new ManhattanDistance(),

      CORNERS: new CornerOrientation(),

      EDGES: new EdgeOrientation(),
    };
  }

  get(name) {
    return this.heuristics[name];
  }
}

export default new HeuristicFactory();
