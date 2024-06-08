import React from "react";
import { handleHome } from "./clickHandler";
import { useNavigate } from "react-router-dom";
function HomeQuiz() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => handleHome(navigate, "/quiz/createQuiz")}>
        Create Quiz
      </button>
      <button onClick={() => handleHome(navigate, "/quiz/playQuiz")}>
        Play Quiz
      </button>
      <button onClick={() => handleHome(navigate, "/")}>Back</button>
    </div>
  );
}

export default HomeQuiz;
