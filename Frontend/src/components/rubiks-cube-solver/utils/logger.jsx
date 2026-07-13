export function logMove(move) {
  console.log(
    `%c${move}`,
    "background:#222;color:#00ff00;padding:4px 8px;border-radius:4px;",
  );
}

export function logScramble(scramble) {
  console.log("%cScramble", "color:orange;font-weight:bold;");

  console.log(scramble.join(" "));
}

export function logSolver(name) {
  console.log(`%c${name}`, "color:cyan;font-size:16px;");
}
