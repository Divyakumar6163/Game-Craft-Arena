import React from "react";
import axios from "axios";
function CreateQuizModal({ quiz }) {
  let data = { quiz: quiz };
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
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default CreateQuizModal;
