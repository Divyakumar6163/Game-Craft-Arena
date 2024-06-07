import React, { useContext, useEffect, useState } from "react";
import styles from "./QnsAns.module.css";
import handleOption from "./handleOption";
import axios from "axios";
import { QuizContext } from "../../context/quizContext";
import Modal from "./Modal";

function QnsAns() {
  const [quizData, setQuizData] = useState([]);
  const { index, nextIndex, correctAns } = useContext(QuizContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/quiz");
        setQuizData(
          response.data[Math.floor(Math.random() * response.data.length)].quiz
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const currentQuestion = index !== quizData.length ? quizData[index] : null;
  if (!currentQuestion) {
    return <Modal length={index} />;
  }
  return (
    <div className={styles.questionContainer}>
      <h1 className={styles.question}>{currentQuestion?.question}</h1>
      <div className={styles.options}>
        {currentQuestion?.options.map((option, idx) => (
          <button
            key={idx}
            className={styles.option}
            onClick={() =>
              handleOption(
                option,
                currentQuestion?.answer,
                nextIndex,
                correctAns
              )
            }
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
export default QnsAns;
