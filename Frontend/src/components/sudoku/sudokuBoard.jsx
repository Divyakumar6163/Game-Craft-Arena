import React, { useState } from "react";
import styles from "./sudokuBoard.module.css";
import { isSafe, generateInitialBoard, isValid } from "./helperFunctions";
import Modal from "./Modal";
import Buttons from "./sudokuButtons";
import FooterButtons from "./FooterButton";
import Timer from "./Timer";
function SudokuBoard() {
  const [initialBoard, setInitialBoard] = useState(generateInitialBoard());
  const [gameBoard, setGameBoard] = useState(initialBoard);
  const [solvedSudoku, setSolvedSudoku] = useState(null);
  const [win, setWin] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [modal, setModal] = useState(false);
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

  return (
    <div className={styles.mainContainer}>
      <header className={styles.header}>
        {!modal && <h1 className={styles.h1}>Sudoku</h1>}

        {!solvedSudoku && !modal && (
          <Timer
            timer={timer}
            setTimer={setTimer}
            isPlay={isPlay}
            setIsPlay={setIsPlay}
          />
        )}
      </header>
      <div className={styles.sudokuContainer}>
        {!modal && (
          <div className={styles.boardContainer}>
            {!solvedSudoku && (
              <ol className={styles.ol}>
                {gameBoard.map((row, rowIndex) => (
                  <li key={rowIndex} className={styles.li}>
                    {row.map((cell, cellIndex) => (
                      <input
                        key={cellIndex}
                        type="number"
                        disabled={initialBoard[rowIndex][cellIndex] !== null}
                        className={styles.input}
                        style={{
                          backgroundColor: `${initialBoard[rowIndex][cellIndex] !== null ? "rgb(240, 240, 240)" : "white"}`,
                        }}
                        value={cell !== null ? cell : ""}
                        onChange={(event) =>
                          handleInput(event, rowIndex, cellIndex)
                        }
                      />
                    ))}
                  </li>
                ))}
              </ol>
            )}
            {solvedSudoku && (
              <ol className={styles.ol}>
                {solvedSudoku.map((row, rowIndex) => (
                  <li key={rowIndex} className={styles.li}>
                    {row.map((cell, cellIndex) => (
                      <input
                        key={cellIndex}
                        type="number"
                        disabled={true}
                        className={styles.input}
                        value={cell !== null ? cell : ""}
                        style={{
                          color: `${initialBoard[rowIndex][cellIndex] !== null ? "black" : "red"}`,
                        }}
                      />
                    ))}
                  </li>
                ))}
              </ol>
            )}
          </div>
        )}
        {!modal && (
          <Buttons
            initialBoard={initialBoard}
            isValid={isValid}
            win={win}
            setSolvedSudoku={setSolvedSudoku}
            gameBoard={gameBoard}
            setWin={setWin}
            solvedSudoku={solvedSudoku}
            setGameBoard={setGameBoard}
            setTimer={setTimer}
            setIsPlay={setIsPlay}
            setInitialBoard={setInitialBoard}
            setModal={setModal}
          />
        )}
        {win && (
          <div className={styles.p}>
            <Modal
              timer={timer}
              setGameBoard={setGameBoard}
              setSolvedSudoku={setSolvedSudoku}
              setWin={setWin}
              setTimer={setTimer}
              setIsPlay={setIsPlay}
              setInitialBoard={setInitialBoard}
              win={win}
              setModal={setModal}
            />
          </div>
        )}
      </div>
      {!solvedSudoku && !modal && (
        <FooterButtons
          setGameBoard={setGameBoard}
          setSolvedSudoku={setSolvedSudoku}
          setWin={setWin}
          setTimer={setTimer}
          setIsPlay={setIsPlay}
          setInitialBoard={setInitialBoard}
        />
      )}
    </div>
  );
}

export default SudokuBoard;
