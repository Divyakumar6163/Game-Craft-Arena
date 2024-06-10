import React, { useState } from "react";
import CreateQuizModal from "./createQuizModal";
import styles from "./createQuiz.module.css";
import NumberOfQnsInput from "./numberOfQnsInput";
import QuizInputForm from "./QuizInputForm";
import { handleHome } from "./clickHandler";
import { useNavigate } from "react-router-dom";
function CreateQuiz() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);
  const [quiz, setQuiz] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: "",
  });
  function handleRetake() {
    setShowModal(false);
    setNumberOfQuestions(1);
    setCurrentQuestion({
      question: "",
      options: ["", "", "", ""],
      answer: "",
    });
    setQuiz([]);
    setIsSubmitted(false);
  }
  return (
    <>
      <div className={styles.header}>
        <h1>Create Quiz</h1>
      </div>
      <div className={styles.main}>
        {!showModal && (
          <div
            className={styles.formDiv}
            style={{
              marginTop: `${!isSubmitted || numberOfQuestions <= 0 ? "0vh" : "15vh"}`,
            }}
          >
            {(!isSubmitted || numberOfQuestions <= 0) && (
              <NumberOfQnsInput
                setIsSubmitted={setIsSubmitted}
                setNumberOfQuestions={setNumberOfQuestions}
                numberOfQuestions={numberOfQuestions}
                isSubmitted={isSubmitted}
              />
            )}
            {isSubmitted && numberOfQuestions > 0 && (
              <QuizInputForm
                setCurrentQuestion={setCurrentQuestion}
                currentQuestion={currentQuestion}
                setShowModal={setShowModal}
                setQuiz={setQuiz}
                quiz={quiz}
                numberOfQuestions={numberOfQuestions}
              />
            )}
          </div>
        )}
        {showModal && (
          <CreateQuizModal
            quiz={quiz}
            setQuiz={setQuiz}
            setShowModal={setShowModal}
            setIsSubmitted={setIsSubmitted}
            setNumberOfQuestions={setNumberOfQuestions}
            setCurrentQuestion={setCurrentQuestion}
          />
        )}
      </div>
      <footer className={styles.footer}>
        <button
          className={styles.backButton}
          onClick={() => handleHome(navigate, "/quiz")}
        >
          Back
        </button>
        <button onClick={handleRetake} className={styles.reFreshButton}>
          Refresh
        </button>
      </footer>
    </>
  );
}

export default CreateQuiz;
