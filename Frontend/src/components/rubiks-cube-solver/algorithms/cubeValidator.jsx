const REQUIRED = {
  white: 9,
  yellow: 9,
  red: 9,
  orange: 9,
  green: 9,
  blue: 9,
};

export function validateCube(cube) {
  const count = {};

  Object.keys(REQUIRED).forEach((color) => {
    count[color] = 0;
  });

  cube.forEach((cubie) => {
    Object.values(cubie.colors).forEach((color) => {
      if (color) count[color]++;
    });
  });

  for (const color in REQUIRED) {
    if (count[color] !== REQUIRED[color]) {
      return false;
    }
  }

  return true;
}
