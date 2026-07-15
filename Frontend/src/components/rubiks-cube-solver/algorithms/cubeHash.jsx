/**
 * Converts a cube into a unique string.
 * Used by graph algorithms.
 */
export function cubeHash(cube) {
  if (!cube) {
    console.error("cubeHash received:", cube);
    return "";
  }
  return cube
    .map((cubie) => {
      return [
        cubie.position.join(","),

        cubie.colors.xPositive || "-",
        cubie.colors.xNegative || "-",

        cubie.colors.yPositive || "-",
        cubie.colors.yNegative || "-",

        cubie.colors.zPositive || "-",
        cubie.colors.zNegative || "-",
      ].join("|");
    })
    .join("#");
}
