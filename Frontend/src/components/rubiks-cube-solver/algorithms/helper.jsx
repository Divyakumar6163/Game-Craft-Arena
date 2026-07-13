/**
 * Returns true if a cubie belongs
 * to the specified layer.
 */
export function isCubieInLayer(cubie, axis, layer) {
  const [x, y, z] = cubie.position;

  switch (axis) {
    case "x":
      return x === layer;

    case "y":
      return y === layer;

    case "z":
      return z === layer;

    default:
      return false;
  }
}
/**
 * Deep clone a cubie.
 */
export function cloneCubie(cubie) {
  return {
    ...cubie,
    position: [...cubie.position],
    homePosition: [...cubie.homePosition],
    stickers: {
      ...cubie.stickers,
    },
  };
}
/**
 * Deep clone the entire cube.
 */
export function cloneCube(cube) {
  return cube.map(cloneCubie);
}
