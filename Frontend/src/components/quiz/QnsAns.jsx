import React, { useContext } from "react";
import styles from "./QnsAns.module.css";
import handleOption from "./handleOption";
import { QuizContext } from "../../context/quizContext";
import Modal from "./Modal";
const quizData = [
  {
    question: "Who is our prime minister?",
    options: [
      "Narendra Modi",
      "Shahbaz Sharif",
      "Bilawal Bhutto",
      "None of the above",
    ],
    answer: "Narendra Modi",
  },
  {
    question: "Who is our president?",
    options: [
      "Narendra Modi",
      "Shahbaz Sharif",
      "Bilawal Bhutto",
      "None of the above",
    ],
    answer: "None of the above",
  },
  {
    question: "What is the capital of India?",
    options: ["New Delhi", "Islamabad", "Karachi", "Mumbai"],
    answer: "New Delhi",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
    answer: "Blue Whale",
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "South Korea", "Thailand"],
    answer: "Japan",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: [
      "Charles Dickens",
      "William Shakespeare",
      "J.K. Rowling",
      "Mark Twain",
    ],
    answer: "William Shakespeare",
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "O2", "CO2", "H2SO4"],
    answer: "H2O",
  },
  {
    question: "Who is known as the father of computers?",
    options: [
      "Albert Einstein",
      "Isaac Newton",
      "Charles Babbage",
      "Nikola Tesla",
    ],
    answer: "Charles Babbage",
  },
  {
    question: "What is the boiling point of water?",
    options: ["50°C", "100°C", "150°C", "200°C"],
    answer: "100°C",
  },
];

function QnsAns() {
  const { index, nextIndex } = useContext(QuizContext);
  //   console.log(index);
  const currentQuestion = index !== quizData.length ? quizData[index] : null;
  //   console.log(currentQuestion);
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
              handleOption(option, currentQuestion?.answer, nextIndex)
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
