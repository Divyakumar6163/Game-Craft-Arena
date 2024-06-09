import React, { useContext, useEffect, useState } from "react";
import styles from "./QnsAns.module.css";
import handleOption from "./handleOption";
import axios from "axios";
import { QuizContext } from "../../context/quizContext";
import Modal from "./Modal";

function QnsAns() {
  const [quizData, setQuizData] = useState([]);
  const { index, nextIndex, correctAns, isRestart } = useContext(QuizContext);
  const [timer, setTimer] = useState(10); // Initial timer value in seconds

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/quiz/playQuiz");
        setQuizData(
          response.data[Math.floor(Math.random() * response.data.length)].quiz
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [isRestart]);

  const currentQuestion = index !== quizData.length ? quizData[index] : null;

  useEffect(() => {
    if (currentQuestion) {
      if (timer >= 0) {
        const intervalId = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
        return () => clearInterval(intervalId);
      } else {
        nextIndex();
        setTimer(10);
      }
    }
  }, [timer, nextIndex, currentQuestion]);

  if (!currentQuestion) {
    return <Modal length={index} />;
  }

  const progressWidth = `${(timer / 10) * 100}%`;

  return (
    <div className={styles.questionContainer}>
      <div
        className={styles.progressLine}
        style={{ width: progressWidth }}
      ></div>
      <h1 className={styles.timer}>
        <div className={styles.innerCircle}>
          <div
            className={styles.text}
            style={{ color: `${timer <= 3 ? "red" : "white"}` }}
          >
            {timer}
          </div>
        </div>
        <div className={styles.outerCircle}></div>
      </h1>
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
                correctAns,
                setTimer
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
