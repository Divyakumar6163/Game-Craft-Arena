import React, { useContext } from "react";
import { QuizContext } from "../../context/quizContext";
import styles from "./Modal.module.css";

function Modal({ length }) {
  const { score } = useContext(QuizContext);
  return (
    <dialog open className={styles.dialog}>
      <h1 className={styles.title}>Quiz Finished!</h1>
      <p className={styles.score}>
        You scored {score} out of {length} questions.
      </p>
    </dialog>
  );
}

export default Modal;
