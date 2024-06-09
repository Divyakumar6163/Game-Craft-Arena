import React, { useState } from "react";
import styles from "./createQuiz.module.css";
function NumberOfQnsInput({
  setNumberOfQuestions,
  setIsSubmitted,
  numberOfQuestions,
}) {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
      <div className={styles["form-group"]}>
        <label className={styles.label}>Number of Questions</label>
        <div className={styles.formArea}>
          <input
            required
            type="number"
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsClicked(true);
              if (numberOfQuestions > 0) {
                setIsSubmitted(true);
              }
            }}
          >
            Submit
          </button>
        </div>
      </div>
      {numberOfQuestions <= 0 && isClicked && (
        <p className={styles.p}>*Please Enter Correct Size Of Quiz</p>
      )}
    </form>
  );
}

export default NumberOfQnsInput;
