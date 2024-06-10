import React, { useContext, useEffect, useState } from "react";
import styles from "./QnsAns.module.css";
import handleOptionClick from "./handleOption";
import axios from "axios";
import { QuizContext } from "../../context/quizContext";
import Modal from "./Modal";
import { handleHome, handleTest } from "./clickHandler";
import { useNavigate } from "react-router-dom";
function QnsAns() {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState([]);
  const { index, nextIndex, correctAns, isRestart, reTest } =
    useContext(QuizContext);
  const [timer, setTimer] = useState(10);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isClicked, setIsClicked] = useState(true);
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
      if (timer >= 0 && isCorrect === null) {
        // setIsClicked(true);
        const intervalId = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
        return () => clearInterval(intervalId);
      } else if (timer < 0) {
        nextIndex();
        setTimer(10);
      }
    }
  }, [timer, nextIndex, currentQuestion, isCorrect]);

  useEffect(() => {
    if (isCorrect !== null) {
      setIsClicked(false);
      const timeoutId = setTimeout(() => {
        nextIndex();
        setTimer(10);
        setSelectedOption(null);
        setIsCorrect(null);
      }, 500);
      return () => {
        setIsClicked(true);
        clearTimeout(timeoutId);
      };
    }
  }, [isCorrect, nextIndex]);

  if (!currentQuestion) {
    return <Modal length={index} />;
  }
  const progressWidth = `${(timer / 10) * 100}%`;
  return (
    <>
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
              disabled={!isClicked ? true : false}
              style={{
                border:
                  selectedOption === option
                    ? isCorrect
                      ? "5px solid rgb(12, 220, 12)"
                      : "5px solid red"
                    : "5px solid #0a11a2",
              }}
              onClick={() =>
                handleOptionClick(
                  option,
                  currentQuestion,
                  setIsCorrect,
                  correctAns,
                  setSelectedOption
                )
              }
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <footer className={styles.footer}>
        <button
          className={styles.backButton}
          onClick={() => handleHome(navigate, "/quiz")}
        >
          Back
        </button>
        <button
          onClick={() => {
            setTimer(10);
            handleTest(reTest);
          }}
          className={styles.reFreshButton}
        >
          Refresh
        </button>
      </footer>
    </>
  );
}
export default QnsAns;
