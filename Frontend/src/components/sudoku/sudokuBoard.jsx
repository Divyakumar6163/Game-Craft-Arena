import React, { useState } from "react";
import styles from "./sudokuBoard.module.css";

const initialBoard = [
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

function SudokuBoard() {
  const [gameBoard, setGameBoard] = useState(initialBoard);

  function handleInput(event, rowIndex, cellIndex) {
    const value = event.target.value;
    if (value === "" || (value >= 1 && value <= 9)) {
      const updatedGameBoard = [
        ...gameBoard.map((innerArray) => [...innerArray]),
      ];
      updatedGameBoard[rowIndex][cellIndex] = event.target.value;
      setGameBoard(updatedGameBoard);
    }
  }

  return (
    <ol className={styles.ol}>
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex} className={styles.li}>
          {row.map((cell, cellIndex) => (
            <input
              key={cellIndex}
              type="number"
              className={styles.input}
              value={cell !== null ? cell : ""}
              onChange={(event) => handleInput(event, rowIndex, cellIndex)}
            />
          ))}
        </li>
      ))}
    </ol>
  );
}

export default SudokuBoard;
