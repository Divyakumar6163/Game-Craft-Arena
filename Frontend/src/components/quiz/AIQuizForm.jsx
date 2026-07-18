import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./createQuiz.module.css";
import { io } from "socket.io-client";

// const socket = io("http://localhost:8000");
const socket = io("https://game-craft-arena.onrender.com");

function AIQuizForm({ setQuiz, setShowEditor }) {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [jobId, setJobId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!jobId) return;

    const handleProcessing = (data) => {
      if (String(data.jobId) !== String(jobId)) return;

      setProgress(data.progress);
      setStatus(data.message);
    };

    const handleCompleted = (data) => {
      if (String(data.jobId) !== String(jobId)) return;

      setLoading(false);

      setQuiz(data.quiz);

      setShowEditor(true);
    };

    const handleFailed = (data) => {
      if (String(data.jobId) !== String(jobId)) return;

      setLoading(false);
      setError(data.message);
    };

    socket.on("quiz:processing", handleProcessing);
    socket.on("quiz:completed", handleCompleted);
    socket.on("quiz:failed", handleFailed);

    return () => {
      socket.off("quiz:processing", handleProcessing);
      socket.off("quiz:completed", handleCompleted);
      socket.off("quiz:failed", handleFailed);
    };
  }, [jobId, setQuiz, setShowEditor]);

  const handleGenerateQuiz = async (e) => {
    e.preventDefault();

    setError("");
    setProgress(0);
    setStatus("");
    setLoading(true);

    try {
      const response = await axios.post(
        // "http://localhost:8000/quiz/createAIQuiz",
        "https://game-craft-arena.onrender.com/quiz/createAIQuiz",
        {
          topic,
          difficulty,
          numberOfQuestions,
          additionalInfo,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setJobId(response.data.jobId);
    } catch (err) {
      console.error(err);

      setLoading(false);

      setError(
        err?.response?.data?.message ||
          "Failed to generate quiz. Please try again.",
      );
    }
  };

  return (
    <form onSubmit={handleGenerateQuiz} className={styles.formQuizData}>
      <h3 className={styles.h3}>Generate AI Quiz</h3>

      <div className={styles.formGroup}>
        <input
          required
          className={styles.formInput}
          type="text"
          placeholder="Enter Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <select
          className={styles.formInput}
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <input
          required
          className={styles.formInput}
          type="number"
          min="1"
          max="50"
          value={numberOfQuestions}
          onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
        />
      </div>
      <div className={styles.formGroup}>
        <textarea
          required
          className={styles.formInput}
          type="text"
          placeholder="Enter Addtional Information..."
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
        />
      </div>
      {loading && (
        <div
          style={{
            marginTop: "30px",
            padding: "25px",
            borderRadius: "16px",
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
            textAlign: "center",
            border: "1px solid rgba(37,99,235,0.15)",
            animation: "fadeIn 0.3s ease",
          }}
        >
          <div
            style={{
              fontSize: "42px",
              marginBottom: "12px",
            }}
          >
            🤖
          </div>

          <h3
            style={{
              margin: 0,
              color: "#2563eb",
              fontWeight: 700,
            }}
          >
            Generating AI Quiz
          </h3>

          <p
            style={{
              marginTop: "12px",
              color: "#555",
              fontSize: "15px",
            }}
          >
            {status}
          </p>

          <div
            style={{
              width: "100%",
              height: "12px",
              background: "#e5e7eb",
              borderRadius: "999px",
              overflow: "hidden",
              marginTop: "18px",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "linear-gradient(90deg,#3b82f6,#2563eb,#1d4ed8)",
                borderRadius: "999px",
                transition: "width 0.5s ease",
              }}
            />
          </div>

          <div
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#666",
              fontSize: "14px",
            }}
          >
            <span>{progress}% Completed</span>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#2563eb",
                fontWeight: 600,
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  border: "3px solid rgba(37,99,235,0.25)",
                  borderTop: "3px solid #2563eb",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              Processing...
            </div>
          </div>
        </div>
      )}

      {error && (
        <p
          style={{
            color: "red",
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          {error}
        </p>
      )}

      {!loading && (
        <button type="submit" className={styles.saveButton} disabled={loading}>
          Generate Quiz
        </button>
      )}
    </form>
  );
}

export default AIQuizForm;
