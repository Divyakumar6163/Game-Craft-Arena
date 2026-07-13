/**
 * Rotate a position around an axis.
 * Returns a NEW position.
 */
export function rotatePosition(position, axis, clockwise = true) {
  const [x, y, z] = position;

  switch (axis) {
    case "x":
      return clockwise ? [x, -z, y] : [x, z, -y];

    case "y":
      return clockwise ? [z, y, -x] : [-z, y, x];

    case "z":
      return clockwise ? [-y, x, z] : [y, -x, z];

    default:
      return position;
  }
}
/**
 * Rotate cubie face colors around an axis.
 * Returns a NEW colors object.
 */
export function rotateColors(colors, axis, clockwise = true) {
  const next = { ...colors };

  const cycle = (a, b, c, d) => {
    if (clockwise) {
      next[a] = colors[d];
      next[b] = colors[a];
      next[c] = colors[b];
      next[d] = colors[c];
    } else {
      next[a] = colors[b];
      next[b] = colors[c];
      next[c] = colors[d];
      next[d] = colors[a];
    }
  };

  switch (axis) {
    case "x":
      cycle("yPositive", "zPositive", "yNegative", "zNegative");
      break;

    case "y":
      cycle("zPositive", "xPositive", "zNegative", "xNegative");
      break;

    case "z":
      cycle("yPositive", "xNegative", "yNegative", "xPositive");
      break;

    default:
      break;
  }

  return next;
}
