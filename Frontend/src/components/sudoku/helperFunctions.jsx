export function isSafe(safeBoard, safeRow, safeCol, num) {
  for (let r = 0; r < 9; r++) {
    if (safeBoard[r][safeCol] === num) {
      return false;
    }
  }
  for (let c = 0; c < 9; c++) {
    if (safeBoard[safeRow][c] === num) {
      return false;
    }
  }
  const startRow = safeRow - (safeRow % 3);
  const startCol = safeCol - (safeCol % 3);
  for (let sr = startRow; sr < startRow + 3; sr++) {
    for (let sc = startCol; sc < startCol + 3; sc++) {
      if (safeBoard[sr][sc] === num) {
        return false;
      }
    }
  }
  return true;
}

export function generateInitialBoard() {
  let board = [
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
  ];
  let count = 0;
  while (count < 30) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    const num = Math.floor(Math.random() * 9) + 1;
    if (board[row][col] === null && isSafe(board, row, col, num)) {
      board[row][col] = num;
      count++;
    }
  }
  if (!isValidMain(board)) {
    return generateInitialBoard();
  } else {
    return board;
  }
}

export function isValidMain(board) {
  return isValid(board.map((row) => row.slice()));
}

export function isValid(validBoard, validRow = 0, validCol = 0) {
  if (validRow === 9) {
    return true;
  }
  let nextRow = validRow;
  let nextCol = validCol + 1;
  if (nextCol === 9) {
    nextRow = validRow + 1;
    nextCol = 0;
  }
  if (validBoard[validRow][validCol] !== null) {
    return isValid(validBoard, nextRow, nextCol);
  }
  for (let digit = 1; digit <= 9; digit++) {
    if (isSafe(validBoard, validRow, validCol, Number(digit))) {
      validBoard[validRow][validCol] = digit;
      if (isValid(validBoard, nextRow, nextCol)) {
        return true;
      }
      validBoard[validRow][validCol] = null;
    }
  }
  return false;
}
