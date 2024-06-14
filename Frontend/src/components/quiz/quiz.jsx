import React from "react";
import styles from "./quiz.module.css";
import QnsAns from "./QnsAns";
import { QuizProvider } from "../../context/quizContext";
function Question() {
  return (
    <QuizProvider>
      <header className={styles.header}>
        <h1>Quiz Play</h1>
      </header>
      <main className={styles.main}>
        <QnsAns />
      </main>
    </QuizProvider>
  );
}
export default Question;
