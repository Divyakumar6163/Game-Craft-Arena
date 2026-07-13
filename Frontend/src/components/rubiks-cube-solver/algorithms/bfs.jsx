import GraphNode from "./graphNode";

import { serializeCube } from "./cubeSerializer";

import { reconstructPath } from "./reconstructPath";

import { applyMove } from "./applyMoves";

const MOVES = [
  "R",
  "R'",
  "L",
  "L'",
  "U",
  "U'",
  "D",
  "D'",
  "F",
  "F'",
  "B",
  "B'",
];

export function bfs(startCube, isGoal) {
  const queue = [];

  const visited = new Set();

  const root = new GraphNode(startCube);

  queue.push(root);

  visited.add(serializeCube(startCube));

  while (queue.length) {
    const node = queue.shift();

    if (isGoal(node.cube)) {
      return reconstructPath(node);
    }

    for (const move of MOVES) {
      const nextCube = applyMove(node.cube, move);

      const hash = serializeCube(nextCube);

      if (visited.has(hash)) continue;

      visited.add(hash);

      queue.push(
        new GraphNode(
          nextCube,

          node,

          move,

          node.depth + 1,
        ),
      );
    }
  }

  return null;
}
