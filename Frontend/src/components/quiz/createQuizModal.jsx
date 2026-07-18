import React, { useState } from "react";
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
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const data = { quiz };

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage("Saving quiz...");

      await axios.post(
        // "http://localhost:8000/quiz/createQuiz",
        "https://game-craft-arena.onrender.com/quiz/createQuiz",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setMessage("Quiz saved!");

      setTimeout(() => {
        navigate("/quiz");
      }, 1000);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setMessage("❌ Failed to save quiz. Please try again.");
    }
  };

  function handleRetake() {
    if (loading) return;

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
      <h1 className={styles.h1}>Are you sure you want to save this quiz?</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <button
          className={styles.button}
          onClick={handleRetake}
          disabled={loading}
        >
          Retake
        </button>

        <button
          className={styles.button}
          onClick={handleSave}
          disabled={loading}
          style={{
            minWidth: "140px",
          }}
        >
          {loading ? (
            <>
              <span className={styles.spinner}></span>
              {message}
            </>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </div>
  );
}

export default CreateQuizModal;
