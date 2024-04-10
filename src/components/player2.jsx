import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./modal";
import styles from "./player2.module.css";
export default function Player2({ dataReceived, attempts, player2Name }) {
  const [finalAttempts, setFinalAttempts] = useState(attempts);
  const [guess, setGuess] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [modal, setModal] = useState(false);
  const [score, setScore] = useState("0");
  const [shakeAttempts, setShakeAttempts] = useState(false);
  const navigate = useNavigate();
  function handleGuess(event) {
    setGuess(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (guess !== dataReceived.object) {
      setFinalAttempts((finalAttempts) => finalAttempts - 1);
      setIsSubmitted(false);
      setShakeAttempts(true);
      setTimeout(() => setShakeAttempts(false), 500);
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
  function handleBack() {
    navigate("/player1");
  }
  return (
    <div className={styles.mainContainer}>
      <button className={styles.backButton} onClick={handleBack}>
        Back
      </button>
      <div
        className={styles.playerContainer}
        style={{ opacity: modal ? 0.05 : 1 }}
      >
        <h2 className={styles.title}>Player 2-{player2Name}</h2>
        <div className={styles.innerContainer}>
          <div className={styles.descriptionContainer}>
            <p style={{ color: "#F1F3FFFF" }}>Guess the object:</p>
            <p style={{ color: "#F1F3FFFF" }}>{dataReceived.category}</p>
            <p style={{ color: "#F1F3FFFF" }}>{dataReceived.description}</p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className={styles.guessInputContainer}>
                <input
                  type="text"
                  className={styles.guessInput}
                  value={guess}
                  onChange={handleGuess}
                  placeholder="Enter your guess"
                  required
                />
                <button type="submit" className={styles.submitButton}>
                  Submit
                </button>
              </div>
            </form>

            {/* {attempts <= 8 && (
              <form onSubmit={handleSubmit}>
                <div className={styles.guessInputContainer}>
                  <input
                    type="text"
                    className={styles.guessInput}
                    value={guess}
                    onChange={handleGuess}
                    placeholder="Enter your guess"
                    required
                  />
                  <button type="submit" className={styles.submitButton}>
                    Submit
                  </button>
                </div>
              </form>
            )} */}
          </div>
          {finalAttempts <= 3 && attempts > 3 ? (
            <p
              className={`${styles.attemptsLabel} ${
                shakeAttempts ? styles.shake : ""
              }`}
              style={{ color: "red" }}
            >
              Attempts left: {finalAttempts}
            </p>
          ) : (
            <p
              className={`${styles.attemptsLabel} ${
                shakeAttempts ? styles.shake : ""
              }`}
            >
              Attempts left: {finalAttempts}
            </p>
          )}
        </div>
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
  );
}
