import React from "react";
import styles from "./sudokuBoard.module.css";
import { useNavigate } from "react-router-dom";
import { generateInitialBoard } from "./helperFunctions";
function Buttons({
  initialBoard,
  isValid,
  setSolvedSudoku,
  setModal,
  gameBoard,
  setWin,
  solvedSudoku,
  setGameBoard,
  setInitialBoard,
  setTimer,
  setIsPlay,
  win,
}) {
  const [note, setNote] = React.useState(false);
  function handleReset() {
    setGameBoard([...initialBoard]);
    setSolvedSudoku(null);
    setWin(false);
    setTimer(0);
    setIsPlay(false);
  }

  function handleSolve() {
    const solvedBoard = initialBoard.map((row) => row.slice());
    if (isValid(solvedBoard)) {
      setSolvedSudoku(solvedBoard);
    } else {
      alert("Sudoku puzzle is unsolvable.");
    }
  }

  function handleSubmit() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (gameBoard[row][col] === null) {
          setWin(false);
          setNote(true);
          setTimeout(() => {
            setNote(false);
          }, 3000);
          return;
        }
      }
    }
    setWin(true);
    setIsPlay(false);
    setModal(true);
  }
  const navigate = useNavigate();
  function handleHome() {
    navigate("/");
  }
  function handleRestart() {
    const newInitialBoard = generateInitialBoard();
    setInitialBoard(newInitialBoard);
    setGameBoard(newInitialBoard);
    setSolvedSudoku(null);
    setWin(false);
    setTimer(0);
    setIsPlay(false);
  }
  return (
    <>
      <div className={styles.buttonContainer}>
        {!solvedSudoku && (
          <button className={styles.button} onClick={handleReset}>
            Reset
          </button>
        )}
        {!solvedSudoku && (
          <button onClick={handleSolve} className={styles.button}>
            Solve
          </button>
        )}
        {!solvedSudoku && (
          <button onClick={handleSubmit} className={styles.button}>
            Submit
          </button>
        )}

        {solvedSudoku && (
          <button onClick={handleHome} className={styles.button}>
            Home
          </button>
        )}
        {solvedSudoku && (
          <button onClick={handleRestart} className={styles.button}>
            New Game
          </button>
        )}
      </div>
      {note && !win && (
        <p className={styles.note}>*Please fill in all the cells.</p>
      )}
    </>
  );
}

export default Buttons;
