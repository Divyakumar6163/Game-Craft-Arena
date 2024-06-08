import { createContext, useState } from "react";
const QuizContext = createContext();
const QuizProvider = ({ children }) => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isRestart, setIsRestart] = useState(false);
  const nextIndex = () => {
    setIndex((prevIndex) => {
      return prevIndex + 1;
    });
  };
  const correctAns = () => {
    setScore((prev) => {
      return prev + 1;
    });
  };
  const reStart = () => {
    setIndex(0);
    setScore(0);
    setIsRestart((prev) => {
      return !prev;
    });
  };
  const reTest = () => {
    setIndex(0);
    setScore(0);
  };
  return (
    <QuizContext.Provider
      value={{
        index,
        nextIndex,
        score,
        correctAns,
        isRestart,
        reStart,
        reTest,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
export { QuizContext, QuizProvider };
