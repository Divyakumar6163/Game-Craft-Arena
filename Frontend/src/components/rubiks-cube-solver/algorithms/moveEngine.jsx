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
 * Rotate one layer of the cube.
 *
 * axis:
 *  x
 *  y
 *  z
 *
 * layer:
 *  -1
 *   0
 *   1
 */
export function rotateLayer(cube, axis, layer, clockwise = true) {
  const newCube = cloneCube(cube);

  newCube.forEach((cubie) => {
    const [x, y, z] = cubie.position;

    let belongs = false;

    switch (axis) {
      case "x":
        belongs = x === layer;
        break;

      case "y":
        belongs = y === layer;
        break;

      case "z":
        belongs = z === layer;
        break;

      default:
        break;
    }

    if (!belongs) return;

    cubie.position = rotatePosition(cubie.position, axis, clockwise);

    cubie.colors = rotateColors(cubie.colors, axis, clockwise);

    cubie.orientation = (cubie.orientation + (clockwise ? 1 : 3)) % 4;
  });

  return newCube;
}
