export function reconstructPath(node) {
  const moves = [];

  let current = node;

  while (current.parent) {
    moves.push(current.move);

    current = current.parent;
  }

  return moves.reverse();
}
