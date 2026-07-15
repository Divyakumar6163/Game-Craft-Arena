import reconstructPath from "./reconstructPath";
import inverseMove from "../inverseMove";

export default function mergePaths(forwardNode, backwardNode) {
  const first = reconstructPath(forwardNode);

  const second = reconstructPath(backwardNode);

  second.reverse();

  const inverse = second.map((move) => inverseMove[move]);

  return [...first, ...inverse];
}
