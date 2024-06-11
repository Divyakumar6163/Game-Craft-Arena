import React from "react";
import axios from "axios";
import styles from "./createQuizModal.module.css";
import { useNavigate } from "react-router-dom";
function CreateQuizModal({
  quiz,
  setQuiz,
  setShowModal,
  setIsSubmitted,
  setNumberOfQuestions,
  setCurrentQuestion,
}) {
  let data = { quiz: quiz };
  const navigate = useNavigate();
  const handleSave = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/quiz/createQuiz",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTimeout(() => {
        navigate("/quiz/createQuiz");
      }, 0);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
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
    <div className={styles.modal}>
      <h1 className={styles.h1}>Are you sure to Save your Data?</h1>
      <button className={styles.button} onClick={handleRetake}>
        Retake
      </button>
      <button onClick={handleSave} className={styles.button}>
        Save
      </button>
    </div>
  );
}

export default CreateQuizModal;
