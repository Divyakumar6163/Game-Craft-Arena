export default function reconstructPath(node) {
  const path = [];

  let current = node;

  while (current.parent) {
    path.push(current.move);

    current = current.parent;
  }

  return path.reverse();
}
