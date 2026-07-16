//This is MVR based soln bestsolution is Algorithm X with Dancing Links
const SIZE = 9;
export function isSafe(board, row, col, num) {
  if (num === null) return true;
  for (let c = 0; c < SIZE; c++) {
    if (c !== col && board[row][c] === num) {
      return false;
    }
  }
  for (let r = 0; r < SIZE; r++) {
    if (r !== row && board[r][col] === num) {
      return false;
    }
  }
  const startRow = Math.floor(row / 3) * 3;

  const startCol = Math.floor(col / 3) * 3;

  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if ((r !== row || c !== col) && board[r][c] === num) {
        return false;
      }
    }
  }

  return true;
}
function cloneBoard(board) {
  return board.map((row) => [...row]);
}
function findBestCell(board) {
  let bestRow = -1;
  let bestCol = -1;

  let bestCandidates = null;

  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (board[row][col] !== null) continue;

      const candidates = [];

      for (let digit = 1; digit <= 9; digit++) {
        if (isSafe(board, row, col, digit)) {
          candidates.push(digit);
        }
      }

      if (candidates.length === 0) return null;
      if (
        bestCandidates === null ||
        candidates.length < bestCandidates.length
      ) {
        bestCandidates = candidates;

        bestRow = row;

        bestCol = col;

        if (candidates.length === 1) {
          break;
        }
      }
    }
  }

  if (bestCandidates === null) {
    return {
      row: -1,

      col: -1,

      candidates: [],
    };
  }

  return {
    row: bestRow,

    col: bestCol,

    candidates: bestCandidates,
  };
}
function solve(board) {
  const bestCell = findBestCell(board);

  if (bestCell === null) return false;
  if (bestCell.row === -1) return true;

  const { row, col, candidates } = bestCell;
  for (const digit of candidates) {
    board[row][col] = digit;

    if (solve(board)) return true;

    board[row][col] = null;
  }

  return false;
}

export function solveSudoku(board) {
  const copy = cloneBoard(board);

  if (solve(copy)) return copy;

  return null;
}
export function isValid(board) {
  const copy = cloneBoard(board);

  return solve(copy);
}
function shuffle(array) {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}
function fillBoard(board) {
  const bestCell = findBestCell(board);

  if (bestCell === null) return false;

  if (bestCell.row === -1) return true;

  const { row, col, candidates } = bestCell;

  const digits = shuffle(candidates);

  for (const digit of digits) {
    board[row][col] = digit;

    if (fillBoard(board)) return true;

    board[row][col] = null;
  }

  return false;
}
export function generateInitialBoard(difficulty = "medium") {
  const board = Array.from({ length: 9 }, () => Array(9).fill(null));

  fillBoard(board);

  const cells = [];

  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      cells.push({
        row,
        col,
      });
    }
  }

  const shuffled = shuffle(cells);

  let blanks = 45;

  if (difficulty === "easy") blanks = 35;
  else if (difficulty === "hard") blanks = 55;

  for (let i = 0; i < blanks; i++) {
    const { row, col } = shuffled[i];

    board[row][col] = null;
  }

  return board;
}
