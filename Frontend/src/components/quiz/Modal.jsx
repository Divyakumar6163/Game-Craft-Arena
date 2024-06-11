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
        You scored{" "}
        <span
          style={{
            color: `${score <= length / 3 ? "red" : score <= (2 * length) / 3 ? "yellow" : "rgb(9, 236, 9)"}`,
          }}
        >
          {score}
        </span>{" "}
        out of&nbsp;&nbsp;
        <span style={{ color: "black" }}>{length}</span> questions.
      </p>
      <button
        onClick={() => handleHome(navigate, "/quiz")}
        className={styles.button}
      >
        Home
      </button>
      <button onClick={() => handleRestart(reStart)} className={styles.button}>
        Start New Quiz
      </button>
      <button onClick={() => handleTest(reTest)} className={styles.button}>
        Retake Quiz
      </button>
    </dialog>
  );
}

export default Modal;
