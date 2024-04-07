import { useState } from "react";
import Modal from "./modal";
import styles from "./player2.module.css";
export default function Player2({ dataReceived, attempts, player2Name }) {
  const [finalAttempts, setFinalAttempts] = useState(attempts);
  const [guess, setGuess] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [modal, setModal] = useState(false);
  const [score, setScore] = useState("0");
  function handleGuess(event) {
    setGuess(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (guess !== dataReceived.object) {
      setFinalAttempts((finalAttempts) => finalAttempts - 1);
      setIsSubmitted(false);
    } else if (guess === dataReceived.object) {
      setIsSubmitted(true);
      setScore(Math.round((finalAttempts * 100) / attempts));
    }
    if (finalAttempts === 1 || guess === dataReceived.object) {
      setModal(true);
      // console.log(finalAttempts);
    }
  }
  function handleClose() {
    setModal(false);
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.playerContainer}>
        <h2 className={styles.title}>Player 2-{player2Name}</h2>
        <div className={styles.innerContainer}>
          <div className={styles.descriptionContainer}>
            <p>Guess the object:</p>
            <p>{dataReceived.category}</p>
            <p>{dataReceived.description}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.guessInputContainer}>
              <input
                type="text"
                className={styles.guessInput}
                value={guess}
                onChange={handleGuess}
                placeholder="Enter your guess"
              />
              <button type="submit" className={styles.submitButton}>
                Submit
              </button>
            </div>
          </form>
          <p className={styles.attemptsLabel}>Attempts left: {finalAttempts}</p>
        </div>
        {guess === dataReceived.object && isSubmitted && modal && (
          <Modal
            message="You Won"
            leftAttempts={finalAttempts}
            className={styles.modalMessage}
            onClose={handleClose}
            finalScore={score}
          />
        )}
        {finalAttempts === 0 && modal && (
          <Modal
            message="You Lost"
            finalScore="0"
            leftAttempts={finalAttempts}
            className={styles.modalMessage}
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  );
}
