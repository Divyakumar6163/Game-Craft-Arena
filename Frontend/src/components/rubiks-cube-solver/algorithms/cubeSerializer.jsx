const ORDER = [
  "yPositive",
  "yNegative",
  "xNegative",
  "xPositive",
  "zPositive",
  "zNegative",
];

export function serializeCube(cube) {
  return cube
    .map((cubie) => ORDER.map((face) => cubie.colors[face] || "-").join(""))
    .join("|");
}
export function deserializeCube(string) {
  // We'll implement this later
}
