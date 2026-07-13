import { createSolvedCube } from "./cubeState";
import { applyMoves } from "./applyMoves";
import { serializeCube } from "./cubeSerializer";

const solved = serializeCube(createSolvedCube());

function check(sequence, expected = true) {
  const cube = applyMoves(createSolvedCube(), sequence);

  const result = serializeCube(cube) === solved;

  console.log(sequence.join(" "), result === expected ? "✅ PASS" : "❌ FAIL");
}

export function runTests() {
  console.log("========== Cube Tests ==========");

  check(["R", "R", "R", "R"]);

  check(["U", "U", "U", "U"]);

  check(["F", "F", "F", "F"]);

  check(["R", "R'"]);

  check(["U", "U'"]);

  check(["F", "F'"]);

  check([]);

  console.log("================================");
}
runTests();
