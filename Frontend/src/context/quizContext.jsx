import { createContext, useState } from "react";
const QuizContext = createContext();
const QuizProvider = ({ children }) => {
  const [index, setIndex] = useState(0);
  const nextIndex = () => {
    setIndex((prevIndex) => {
      return prevIndex + 1;
    });
  };
  return (
    <QuizContext.Provider value={{ index, nextIndex }}>
      {children}
    </QuizContext.Provider>
  );
};
export { QuizContext, QuizProvider };
