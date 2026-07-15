import { createSolvedCube } from "./cubeState";
import { cubeHash } from "./cubeHash";

const solvedHash = cubeHash(createSolvedCube());

export function isSolved(cube) {
  return cubeHash(cube) === solvedHash;
}
