const MOVES = [
  "R",
  "R'",
  "L",
  "L'",
  "U",
  "U'",
  "D",
  "D'",
  "F",
  "F'",
  "B",
  "B'",
];

const OPPOSITE = {
  R: "R'",
  "R'": "R",

  L: "L'",
  "L'": "L",

  U: "U'",
  "U'": "U",

  D: "D'",
  "D'": "D",

  F: "F'",
  "F'": "F",

  B: "B'",
  "B'": "B",
};

export function generateScramble(length = 20) {
  const scramble = [];

  while (scramble.length < length) {
    const move = MOVES[Math.floor(Math.random() * MOVES.length)];

    if (scramble.length === 0) {
      scramble.push(move);
      continue;
    }

    const previous = scramble[scramble.length - 1];

    // Avoid immediate cancellation
    if (OPPOSITE[previous] === move) continue;

    scramble.push(move);
  }

  return scramble;
}
