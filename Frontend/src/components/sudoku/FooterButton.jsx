import React from "react";
import styles from "./sudokuBoard.module.css";
import { useNavigate } from "react-router-dom";
import { generateInitialBoard } from "./helperFunctions";

function FooterButton({
  setGameBoard,
  setSolvedSudoku,
  setWin,
  setInitialBoard,
  setTimer,
  setIsPlay,
}) {
  const navigate = useNavigate();

  function handleBack() {
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
    <footer className={styles.footer}>
      <button className={styles.footerButton} onClick={handleBack}>
        Back
      </button>
      <button className={styles.footerButton} onClick={handleRestart}>
        New Game
      </button>
    </footer>
  );
}

export default FooterButton;
