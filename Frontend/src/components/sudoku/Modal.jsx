import React from "react";
import styles from "./Modal.module.css";
import { useNavigate } from "react-router-dom";
import { generateInitialBoard } from "./helperFunctions";

function Modal({
  timer,
  setGameBoard,
  setSolvedSudoku,
  setWin,
  setInitialBoard,
  setTimer,
  setIsPlay,
  setModal,
}) {
  const navigate = useNavigate();
  const hours = Math.floor(timer / 3600);
  const minutes = Math.floor((timer % 3600) / 60);
  const seconds = timer % 60;

  let displayTime = "";
  if (hours > 0) {
    displayTime = `${hours}hr ${minutes}min ${seconds}sec`;
  } else if (minutes > 0) {
    displayTime = `${minutes}min ${seconds}sec`;
  } else {
    displayTime = `${seconds}sec`;
  }

  function handleNo() {
    navigate("/");
  }

  function handleYes() {
    const newInitialBoard = generateInitialBoard();
    setInitialBoard(newInitialBoard);
    setGameBoard(newInitialBoard);
    setSolvedSudoku(null);
    setWin(false);
    setTimer(0);
    setIsPlay(false);
    setModal(false);
  }

  return (
    <dialog open className={styles.dialog}>
      <h1 className={styles.h1}>You Won!</h1>
      <p className={styles.time}>
        You took <span style={{ color: "red" }}>{displayTime}</span> to
        complete.
      </p>
      <p className={styles.p}>Would you like to play again?</p>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleNo}>
          No
        </button>
        <button className={styles.button} onClick={handleYes}>
          Yes
        </button>
      </div>
    </dialog>
  );
}

export default Modal;
