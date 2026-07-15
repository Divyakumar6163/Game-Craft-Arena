import { rotatePosition, rotateColors } from "./rotation";

/**
 * Deep clone the cube.
 */
function cloneCube(cube) {
  return cube.map((cubie) => ({
    ...cubie,
    position: [...cubie.position],
    homePosition: [...cubie.homePosition],
    colors: { ...cubie.colors },
  }));
}

/**
 * Returns true if cubie belongs to the rotating layer.
 */
function belongsToLayer(position, axis, layer) {
  switch (axis) {
    case "x":
      return position[0] === layer;

    case "y":
      return position[1] === layer;

    case "z":
      return position[2] === layer;

    default:
      return false;
  }
}

/**
 * Rotate a single layer.
 */
export function rotateLayer(cube, axis, layer, clockwise = true) {
  const nextCube = cloneCube(cube);

  for (const cubie of nextCube) {
    if (!belongsToLayer(cubie.position, axis, layer)) continue;

    cubie.position = rotatePosition(cubie.position, axis, clockwise);

    cubie.colors = rotateColors(cubie.colors, axis, clockwise);
  }

  return nextCube;
}
