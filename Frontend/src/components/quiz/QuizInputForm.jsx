import React from "react";
import styles from "./createQuiz.module.css";
function QuizInputForm({
  setCurrentQuestion,
  currentQuestion,
  setShowModal,
  setQuiz,
  quiz,
  numberOfQuestions,
}) {
  const handleQuestionInput = (e) => {
    setCurrentQuestion({ ...currentQuestion, question: e.target.value });
  };

  const handleOptionChange = (e, index) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = e.target.value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const handleAnswerInput = (e) => {
    setCurrentQuestion({ ...currentQuestion, answer: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setQuiz((prevQuiz) => [...prevQuiz, currentQuestion]);
    setCurrentQuestion({
      question: "",
      options: ["", "", "", ""],
      answer: "",
    });
    if (quiz.length + 1 === numberOfQuestions) {
      setShowModal(true);
    }
  };
  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <h3 className={styles.h3}>Quiz Data</h3>
      <div className={styles["form-group"]}>
        <input
          required
          type="text"
          placeholder="Enter Question"
          value={currentQuestion.question}
          onChange={handleQuestionInput}
        />
      </div>
      <div className={styles["form-group"]}>
        {currentQuestion.options.map((option, index) => (
          <input
            required
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(e, index)}
          />
        ))}
      </div>
      <div className={styles["form-group"]}>
        <input
          required
          type="text"
          placeholder="Enter Answer"
          value={currentQuestion.answer}
          onChange={handleAnswerInput}
        />
      </div>
      {quiz.length + 1 !== numberOfQuestions ? (
        <button type="submit">Next</button>
      ) : null}
      {quiz.length + 1 === numberOfQuestions ? (
        <button type="submit">Save</button>
      ) : null}
    </form>
  );
}
export default QuizInputForm;
