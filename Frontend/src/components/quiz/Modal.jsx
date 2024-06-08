import React, { useContext } from "react";
import { QuizContext } from "../../context/quizContext";
import styles from "./Modal.module.css";
import handleRestart, { handleTest, handleHome } from "./clickHandler";
import { useNavigate } from "react-router-dom";
function Modal({ length }) {
  const { score, reStart, reTest } = useContext(QuizContext);
  const navigate = useNavigate();
  return (
    <dialog open className={styles.dialog}>
      <h1 className={styles.title}>Quiz Finished!</h1>
      <p className={styles.score}>
        You scored {score} out of {length} questions.
      </p>
      <button onClick={() => handleHome(navigate, "/")}>Home</button>
      <button onClick={() => handleRestart(reStart)}>Start New Quiz</button>
      <button onClick={() => handleTest(reTest)}>Retake Quiz</button>
    </dialog>
  );
}

export default Modal;
