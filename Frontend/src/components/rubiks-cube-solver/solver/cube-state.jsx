export const FACE_COLORS = {
  U: "#FFFFFF",
  R: "#FF3B30",
  F: "#34C759",
  D: "#FFD60A",
  L: "#FF9500",
  B: "#007AFF",
};

export const FACE_NAMES = {
  U: "Up (White)",
  R: "Right (Red)",
  F: "Front (Green)",
  D: "Down (Yellow)",
  L: "Left (Orange)",
  B: "Back (Blue)",
};

export const SCAN_ORDER = ["F", "R", "B", "L", "U", "D"];

export const ALL_FACES = ["U", "R", "F", "D", "L", "B"];

export class CubeState {
  constructor() {
    this.faces = {};

    this.clear();
  }

  setFace(face, colors) {
    if (!ALL_FACES.includes(face)) {
      throw new Error(`Invalid face "${face}"`);
    }

    if (!Array.isArray(colors) || colors.length !== 9) {
      throw new Error("A face must contain exactly 9 stickers.");
    }

    this.faces[face] = [...colors];

    // Center sticker is always fixed.
    this.faces[face][4] = face;
  }

  getFace(face) {
    if (!ALL_FACES.includes(face)) {
      throw new Error(`Invalid face "${face}"`);
    }

    return [...this.faces[face]];
  }

  getSticker(face, index) {
    if (!ALL_FACES.includes(face)) {
      throw new Error(`Invalid face "${face}"`);
    }

    if (index < 0 || index > 8) {
      throw new Error(`Invalid sticker index ${index}`);
    }

    return this.faces[face][index];
  }

  flipHorizontally() {
    for (const face of ALL_FACES) {
      const arr = this.faces[face];

      for (let row = 0; row < 3; row++) {
        const left = row * 3;

        const right = left + 2;

        [arr[left], arr[right]] = [arr[right], arr[left]];
      }
    }
  }

  setSticker(face, index, color) {
    if (!ALL_FACES.includes(face)) {
      throw new Error(`Invalid face "${face}"`);
    }

    if (index < 0 || index > 8) {
      throw new Error(`Invalid sticker index ${index}`);
    }

    // Never allow changing center stickers.
    if (index === 4) {
      return;
    }

    this.faces[face][index] = color;
  }

  clear() {
    this.faces = {};

    for (const face of ALL_FACES) {
      this.faces[face] = Array(9).fill(null);

      // Fixed center sticker
      this.faces[face][4] = face;
    }
  }
  toFaceletString() {
    let result = "";

    for (const face of ALL_FACES) {
      for (const sticker of this.faces[face]) {
        result += sticker ?? "-";
      }
    }

    return result;
  }

  fromFaceletString(faceletString) {
    if (typeof faceletString !== "string" || faceletString.length !== 54) {
      throw new Error("Facelet string must contain exactly 54 characters.");
    }

    let index = 0;

    for (const face of ALL_FACES) {
      this.faces[face] = [];

      for (let i = 0; i < 9; i++) {
        let value = faceletString[index++];

        this.faces[face].push(value === "-" ? null : value);
      }

      // Center stickers are fixed.
      this.faces[face][4] = face;
    }
  }

  isComplete() {
    for (const face of ALL_FACES) {
      for (const sticker of this.faces[face]) {
        if (sticker === null) {
          return false;
        }
      }
    }

    return true;
  }

  reset() {
    this.clear();
  }
  validate() {
    // ===============================
    // Check for empty stickers
    // ===============================

    for (const face of ALL_FACES) {
      for (let i = 0; i < 9; i++) {
        if (this.faces[face][i] === null) {
          return {
            valid: false,
            error: `Face ${face} has an empty sticker at position ${i + 1}.`,
          };
        }
      }
    }

    // ===============================
    // Check color counts
    // ===============================

    const colorCounts = {
      U: 0,
      R: 0,
      F: 0,
      D: 0,
      L: 0,
      B: 0,
    };

    for (const face of ALL_FACES) {
      for (const color of this.faces[face]) {
        if (!(color in colorCounts)) {
          return {
            valid: false,
            error: `Invalid color "${color}" detected.`,
          };
        }

        colorCounts[color]++;
      }
    }

    for (const color of ALL_FACES) {
      if (colorCounts[color] !== 9) {
        return {
          valid: false,
          error: `${FACE_NAMES[color]} should appear exactly 9 times (found ${colorCounts[color]}).`,
        };
      }
    }

    // ===============================
    // Centers are fixed
    // ===============================

    for (const face of ALL_FACES) {
      if (this.faces[face][4] !== face) {
        return {
          valid: false,
          error: `${FACE_NAMES[face]} center sticker cannot be changed.`,
        };
      }
    }

    // ===============================
    // Edge Validation
    // ===============================

    const edgePositions = [
      { faces: ["U", "R"], index: [5, 1] },
      { faces: ["U", "F"], index: [7, 1] },
      { faces: ["U", "L"], index: [3, 1] },
      { faces: ["U", "B"], index: [1, 1] },

      { faces: ["D", "R"], index: [5, 7] },
      { faces: ["D", "F"], index: [1, 7] },
      { faces: ["D", "L"], index: [3, 7] },
      { faces: ["D", "B"], index: [7, 7] },

      { faces: ["F", "R"], index: [5, 3] },
      { faces: ["F", "L"], index: [3, 5] },
      { faces: ["B", "L"], index: [5, 3] },
      { faces: ["B", "R"], index: [3, 5] },
    ];

    const validEdges = [
      "RU",
      "FU",
      "LU",
      "BU",

      "DR",
      "DF",
      "DL",
      "DB",

      "FR",
      "FL",
      "BL",
      "BR",
    ];

    for (const edge of edgePositions) {
      const c1 = this.faces[edge.faces[0]][edge.index[0]];

      const c2 = this.faces[edge.faces[1]][edge.index[1]];

      const pair1 = c1 + c2;
      const pair2 = c2 + c1;

      if (!validEdges.includes(pair1) && !validEdges.includes(pair2)) {
        return {
          valid: false,

          error: `Impossible edge piece: ${FACE_NAMES[c1]} + ${FACE_NAMES[c2]}.`,
        };
      }
    }

    // ===============================
    // Corner Validation
    // ===============================

    const cornerPositions = [
      { faces: ["U", "R", "F"], index: [8, 0, 2] },
      { faces: ["U", "F", "L"], index: [6, 0, 2] },
      { faces: ["U", "L", "B"], index: [0, 0, 2] },
      { faces: ["U", "B", "R"], index: [2, 0, 2] },

      { faces: ["D", "F", "R"], index: [2, 8, 6] },
      { faces: ["D", "L", "F"], index: [0, 8, 6] },
      { faces: ["D", "B", "L"], index: [6, 8, 6] },
      { faces: ["D", "R", "B"], index: [8, 8, 6] },
    ];

    const validCorners = [
      "FRU",
      "FLU",
      "BLU",
      "BRU",

      "DFR",
      "DFL",
      "BDL",
      "BDR",
    ];

    for (const corner of cornerPositions) {
      const colors = [
        this.faces[corner.faces[0]][corner.index[0]],
        this.faces[corner.faces[1]][corner.index[1]],
        this.faces[corner.faces[2]][corner.index[2]],
      ];

      const piece = [...colors].sort().join("");

      let valid = false;

      for (const c of validCorners) {
        if ([...c].sort().join("") === piece) {
          valid = true;
          break;
        }
      }

      if (!valid) {
        return {
          valid: false,

          error: `Impossible corner piece: ${colors
            .map((c) => FACE_NAMES[c])
            .join(", ")}.`,
        };
      }
    }

    return {
      valid: true,

      error: null,
    };
  }
  clone() {
    const copy = new CubeState();

    for (const face of ALL_FACES) {
      copy.faces[face] = [...this.faces[face]];
    }

    return copy;
  }

  equals(other) {
    if (!(other instanceof CubeState)) {
      return false;
    }

    for (const face of ALL_FACES) {
      for (let i = 0; i < 9; i++) {
        if (this.faces[face][i] !== other.faces[face][i]) {
          return false;
        }
      }
    }

    return true;
  }

  static solved() {
    const cube = new CubeState();

    for (const face of ALL_FACES) {
      cube.faces[face] = Array(9).fill(face);
    }

    return cube;
  }

  static empty() {
    return new CubeState();
  }
}
