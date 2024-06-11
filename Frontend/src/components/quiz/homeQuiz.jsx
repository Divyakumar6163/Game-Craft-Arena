import React from "react";
import { handleHome } from "./clickHandler";
import { useNavigate } from "react-router-dom";
import styles from "./homeQuiz.module.css";

function HomeQuiz() {
  const navigate = useNavigate();
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.h1}>Quiz Quest</h1>
      <div className={styles.buttonContainer}>
        <button
          onClick={() => handleHome(navigate, "/quiz/createQuiz")}
          className={styles.button}
        >
          Create Quiz
        </button>
        <button
          onClick={() => handleHome(navigate, "/quiz/playQuiz")}
          className={styles.button}
        >
          Play Quiz
        </button>
        <button
          onClick={() => handleHome(navigate, "/")}
          className={styles.button}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default HomeQuiz;
