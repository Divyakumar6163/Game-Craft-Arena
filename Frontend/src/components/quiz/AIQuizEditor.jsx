import React, { useState } from "react";
import styles from "./createQuiz.module.css";

function AIQuizEditor({ quiz, setQuiz, setShowModal }) {
  const [saving, setSaving] = useState(false);

  const handleQuestionChange = (index, value) => {
    const updated = [...quiz];
    updated[index].question = value;
    setQuiz(updated);
  };

  const handleOptionChange = (qIndex, optionIndex, value) => {
    const updated = [...quiz];
    updated[qIndex].options[optionIndex] = value;

    // Keep answer synced if edited option was selected
    if (updated[qIndex].answer === quiz[qIndex].options[optionIndex]) {
      updated[qIndex].answer = value;
    }

    setQuiz(updated);
  };

  const handleAnswerChange = (index, value) => {
    const updated = [...quiz];
    updated[index].answer = value;
    setQuiz(updated);
  };

  const handleDeleteQuestion = (index) => {
    if (quiz.length === 1) {
      alert("Quiz must contain at least one question.");
      return;
    }

    const updated = quiz.filter((_, i) => i !== index);
    setQuiz(updated);
  };

  const handleAddQuestion = () => {
    setQuiz([
      ...quiz,
      {
        question: "",
        options: ["", "", "", ""],
        answer: "",
      },
    ]);
  };

  const validateQuiz = () => {
    for (const q of quiz) {
      if (!q.question.trim()) {
        alert("Question cannot be empty.");
        return false;
      }

      if (q.options.some((o) => !o.trim())) {
        alert("Please fill all options.");
        return false;
      }

      if (!q.answer) {
        alert("Select the correct answer.");
        return false;
      }
    }

    return true;
  };

  const handleSave = () => {
    if (!validateQuiz()) return;

    setSaving(true);

    setTimeout(() => {
      setSaving(false);
      setShowModal(true);
    }, 700);
  };
  return (
    <div
      style={{
        width: "100%",
        maxHeight: "72vh",
        overflowY: "auto",
        padding: "15px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "35px",
          fontSize: "34px",
          fontWeight: "800",
          background: "linear-gradient(90deg,#fde68a,#ffffff,#fbbf24)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 3px 10px rgba(0,0,0,.25)",
        }}
      >
        Edit AI Generated Quiz
      </h2>

      {quiz.map((question, index) => (
        <div
          key={index}
          style={{
            background: "linear-gradient(180deg,#ffffff,#fafbff)",
            border: "1px solid #e5e7eb",
            borderRadius: "18px",
            padding: "28px",
            marginBottom: "30px",
            boxShadow: "0 10px 25px rgba(0,0,0,.08)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "25px",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg,#3b82f6,#2563eb)",
                color: "white",
                padding: "10px 22px",
                borderRadius: "30px",
                fontWeight: "700",
                fontSize: "17px",
              }}
            >
              Question {index + 1}
            </div>

            <button
              onClick={() => handleDeleteQuestion(index)}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "10px 18px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Delete
            </button>
          </div>

          {/* Question */}
          <label
            style={{
              display: "block",
              fontWeight: 700,
              marginBottom: "8px",
              color: "#374151",
            }}
          >
            Question
          </label>

          <textarea
            rows={3}
            className={styles.formInput}
            value={question.question}
            placeholder="Enter Question"
            onChange={(e) => handleQuestionChange(index, e.target.value)}
            style={{
              width: "100%",
              resize: "vertical",
              minHeight: "90px",
              padding: "12px",
            }}
          />

          <hr
            style={{
              border: "none",
              borderTop: "1px solid #e5e7eb",
              margin: "25px 0",
            }}
          />

          {/* Options */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <label
                  style={{
                    display: "block",
                    fontWeight: 600,
                    marginBottom: "8px",
                    color: "#374151",
                  }}
                >
                  Option {optionIndex + 1}
                </label>

                <input
                  className={styles.formInput}
                  value={option}
                  placeholder={`Option ${optionIndex + 1}`}
                  onChange={(e) =>
                    handleOptionChange(index, optionIndex, e.target.value)
                  }
                />
              </div>
            ))}
          </div>

          {/* Answer */}
          <div
            style={{
              marginTop: "25px",
            }}
          >
            <label
              style={{
                display: "block",
                fontWeight: 700,
                marginBottom: "8px",
                color: "#374151",
              }}
            >
              Correct Answer
            </label>

            <select
              className={styles.formInput}
              value={question.answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            >
              <option value="">Select Correct Answer</option>

              {question.options.map((option, i) => (
                <option key={i} value={option}>
                  {option || `Option ${i + 1}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "30px",
          marginBottom: "25px",
        }}
      >
        <button
          className={styles.saveButton}
          onClick={handleAddQuestion}
          style={{
            minWidth: "180px",
          }}
        >
          ➕ Add Question
        </button>

        <button
          className={styles.saveButton}
          disabled={saving}
          onClick={handleSave}
          style={{
            minWidth: "180px",
          }}
        >
          {saving ? "Preparing..." : "Save Quiz"}
        </button>
      </div>
    </div>
  );
}

export default AIQuizEditor;
