// Standard Rubik's Cube Colors
export const COLORS = {
  UP: "white",
  DOWN: "yellow",
  LEFT: "orange",
  RIGHT: "red",
  FRONT: "green",
  BACK: "blue",
};

// Create solved cube
export function createSolvedCube() {
  const cubies = [];

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        // Skip the invisible core
        if (x === 0 && y === 0 && z === 0) continue;

        const colors = {
          xPositive: x === 1 ? COLORS.RIGHT : null,
          xNegative: x === -1 ? COLORS.LEFT : null,

          yPositive: y === 1 ? COLORS.UP : null,
          yNegative: y === -1 ? COLORS.DOWN : null,

          zPositive: z === 1 ? COLORS.FRONT : null,
          zNegative: z === -1 ? COLORS.BACK : null,
        };

        const visibleFaces = Object.values(colors).filter(Boolean).length;

        let type = "center";

        if (visibleFaces === 2) type = "edge";
        else if (visibleFaces === 3) type = "corner";

        cubies.push({
          id: `${x}${y}${z}`,

          type,

          homePosition: [x, y, z],

          position: [x, y, z],

          orientation: 0,

          colors,
        });
      }
    }
  }

  return cubies;
}
