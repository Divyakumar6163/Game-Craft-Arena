import React from "react";
import { handleHome } from "./clickHandler";
import { useNavigate } from "react-router-dom";
import styles from "./homeQuiz.module.css";

function HomeQuiz() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <button onClick={() => handleHome(navigate, "/quiz/createQuiz")}>
        Create Quiz
      </button>
      <button onClick={() => handleHome(navigate, "/quiz/playQuiz")}>
        Play Quiz
      </button>
      <button onClick={() => handleHome(navigate, "/")}>Back</button>
    </div>
  );
}

export default HomeQuiz;
