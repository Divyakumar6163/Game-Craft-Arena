import React, { useState } from "react";
import CreateQuizModal from "./createQuizModal";

function CreateQuiz() {
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);
  const [quiz, setQuiz] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: "",
  });

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
    <>
      <h1>Create Quiz</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Number of Questions</label>
        <input
          type="number"
          value={numberOfQuestions}
          onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
        />
        <button onClick={(e) => e.preventDefault()}>Submit</button>
      </form>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter Question"
          value={currentQuestion.question}
          onChange={handleQuestionInput}
        />
        <div>
          {currentQuestion.options.map((option, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(e, index)}
            />
          ))}
        </div>
        <input
          type="text"
          placeholder="Enter Answer"
          value={currentQuestion.answer}
          onChange={handleAnswerInput}
        />
        {quiz.length + 1 !== numberOfQuestions ? (
          <button type="submit">Next</button>
        ) : null}
        {quiz.length + 1 === numberOfQuestions ? (
          <button type="submit">Save</button>
        ) : null}
      </form>
      {showModal && <CreateQuizModal quiz={quiz} />}
    </>
  );
}
export default CreateQuiz;
