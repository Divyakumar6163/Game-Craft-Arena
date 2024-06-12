import React, { useState } from "react";
import styles from "./sudokuBoard.module.css";
function isSafe(safeBoard, safeRow, safeCol, num) {
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

function generateInitialBoard() {
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
function isValidMain(board) {
  return isValid(board.map((row) => row.slice()));
}
// let tempBoard = initialBoard;
function isValid(validBoard, validRow = 0, validCol = 0) {
  // console.log(validBoard);
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
let initialBoard = generateInitialBoard();

// console.log(!isValid());
// while (!isValid()) {
//   initialBoard = Array.from({ length: 9 }, () => Array(9).fill(null));
//   tempBoard = initialBoard;
//   console.log(initialBoard);
//   initialBoard = generateInitialBoard();
//   tempBoard = initialBoard;
// }

function SudokuBoard() {
  console.log(initialBoard);
  const [gameBoard, setGameBoard] = useState(initialBoard);
  const [win, setWin] = useState(false);
  function handleInput(event, rowIndex, cellIndex) {
    const value = event.target.value;
    if (value === "" || (value >= 1 && value <= 9)) {
      const updatedGameBoard = [
        ...gameBoard.map((innerArray) => [...innerArray]),
      ];
      if (isSafe(gameBoard, rowIndex, cellIndex, Number(value))) {
        updatedGameBoard[rowIndex][cellIndex] = Number(value) || null;
        setGameBoard(updatedGameBoard);
      }
    }
  }
  function handleSubmit() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (gameBoard[row][col] === null) {
          setWin(false);
          return;
        }
      }
    }
    setWin(true);
    return;
  }
  return (
    <ol className={styles.ol}>
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex} className={styles.li}>
          {row.map((cell, cellIndex) => (
            <>
              {initialBoard[rowIndex][cellIndex] !== null && (
                <input
                  key={cellIndex}
                  type="number"
                  disabled={true}
                  className={styles.input}
                  value={cell !== null ? cell : ""}
                  onChange={(event) => handleInput(event, rowIndex, cellIndex)}
                />
              )}
              {initialBoard[rowIndex][cellIndex] === null && (
                <input
                  key={cellIndex}
                  type="number"
                  disabled={false}
                  className={styles.input}
                  value={cell !== null ? cell : ""}
                  onChange={(event) => handleInput(event, rowIndex, cellIndex)}
                />
              )}
            </>
          ))}
        </li>
      ))}
      <button onClick={handleSubmit} className={styles.button}>
        Submit
      </button>
      {/* {!win && <p className={styles.p}>Quiz is NOT Completed</p>} */}
      {win && <p className={styles.p}>Quiz is Completed</p>}
    </ol>
  );
}

export default SudokuBoard;
