import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./modal";
import styles from "./player2.module.css";
export default function Player2({
  dataReceived,
  dataReceived2,
  dataReceived3,
  attempts,
  player2Name,
}) {
  const [finalAttempts, setFinalAttempts] = useState(attempts);
  const [guess, setGuess] = useState("");
  // const [guess1, setGuess1] = useState("");
  const [guess2, setGuess2] = useState("");
  const [guess3, setGuess3] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [modal, setModal] = useState(false);
  const [score, setScore] = useState("0");
  const [shakeAttempts, setShakeAttempts] = useState(false);
  const [able, setAble] = useState({
    able1: false,
    able2: false,
    able3: false,
  });
  const navigate = useNavigate();
  function handleGuess(event) {
    setGuess(event.target.value);
  }
  function handleGuess2(event) {
    setGuess2(event.target.value);
  }
  function handleGuess3(event) {
    setGuess3(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (guess !== dataReceived.object) {
      setFinalAttempts((finalAttempts) => finalAttempts - 1);
      setIsSubmitted(false);
      setShakeAttempts(true);
      setTimeout(() => setShakeAttempts(false), 500);
    } else if (guess === dataReceived.object) {
      setFinalAttempts((finalAttempts) => finalAttempts - -3);
      setIsSubmitted(true);
      setAble((prevState) => ({ ...prevState, able1: true }));
      setScore(Math.round((finalAttempts * 100) / attempts));
    }
    if (
      finalAttempts === 1 ||
      (attempts > 8 && attempts <= 12 && guess === dataReceived.object)
    ) {
      setModal(true);
      // console.log(finalAttempts);
    } else if (
      finalAttempts === 1 ||
      (attempts > 3 &&
        attempts <= 8 &&
        guess === dataReceived.object &&
        guess2 === dataReceived2.object)
    ) {
      setModal(true);
      // console.log(finalAttempts);
    } else if (
      finalAttempts === 1 ||
      (attempts <= 3 &&
        guess === dataReceived.object &&
        guess2 === dataReceived2.object &&
        guess3 === dataReceived3.object)
    ) {
      setModal(true);
      // console.log(finalAttempts);
    }
  }

  function handleSubmit2(event) {
    event.preventDefault();
    if (guess2 !== dataReceived2.object) {
      setFinalAttempts((finalAttempts) => finalAttempts - 1);
      setIsSubmitted(false);
      setShakeAttempts(true);
      setTimeout(() => setShakeAttempts(false), 500);
    } else if (guess2 === dataReceived2.object) {
      setFinalAttempts((finalAttempts) => finalAttempts - -3);
      setIsSubmitted(true);
      setAble((prevState) => ({ ...prevState, able2: true }));
      setScore(Math.round((finalAttempts * 100) / attempts));
    }
    if (
      finalAttempts === 1 ||
      (attempts > 8 && attempts <= 12 && guess === dataReceived.object)
    ) {
      setModal(true);
      // console.log(finalAttempts);
    } else if (
      finalAttempts === 1 ||
      (attempts > 3 &&
        attempts <= 8 &&
        guess === dataReceived.object &&
        guess2 === dataReceived2.object)
    ) {
      setModal(true);
      // console.log(finalAttempts);
    } else if (
      finalAttempts === 1 ||
      (attempts <= 3 &&
        guess === dataReceived.object &&
        guess2 === dataReceived2.object &&
        guess3 === dataReceived3.object)
    ) {
      setModal(true);
      // console.log(finalAttempts);
    }
  }
  function handleSubmit3(event) {
    event.preventDefault();
    if (guess3 !== dataReceived3.object) {
      setFinalAttempts((finalAttempts) => finalAttempts - 1);
      setIsSubmitted(false);
      setShakeAttempts(true);
      setTimeout(() => setShakeAttempts(false), 500);
    } else if (guess3 === dataReceived3.object) {
      setFinalAttempts((finalAttempts) => finalAttempts - -3);
      setIsSubmitted(true);
      setAble((prevState) => ({ ...prevState, able3: true }));
      setScore(Math.round((finalAttempts * 100) / attempts));
    }
    if (
      finalAttempts === 1 ||
      (attempts > 8 && attempts <= 12 && guess === dataReceived.object)
    ) {
      setModal(true);
      // console.log(finalAttempts);
    } else if (
      finalAttempts === 1 ||
      (attempts > 3 &&
        attempts <= 8 &&
        guess === dataReceived.object &&
        guess2 === dataReceived2.object)
    ) {
      setModal(true);
      // console.log(finalAttempts);
    } else if (
      finalAttempts === 1 ||
      (attempts <= 3 &&
        guess === dataReceived.object &&
        guess2 === dataReceived2.object &&
        guess3 === dataReceived3.object)
    ) {
      setModal(true);
      // console.log(finalAttempts);
    }
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
        style={{
          opacity: modal ? 0.05 : 1,
        }}
      >
        <h2 className={styles.title}>Player 2-{player2Name}</h2>
        <div className={styles.innerContainer}>
          <div style={{ display: "flex", displayDirection: "row" }}>
            <div className={styles.innerContent}>
              <div className={styles.descriptionContainer}>
                <p style={{ color: "#F1F3FFFF" }}>
                  Guess the object {attempts <= 8 && "1"}:
                </p>
                <p style={{ color: "#F1F3FFFF" }}>{dataReceived.category}</p>
                <p style={{ color: "#F1F3FFFF" }}>{dataReceived.description}</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className={styles.guessInputContainer}>
                  <input
                    type="text"
                    className={styles.guessInput}
                    value={guess}
                    onChange={handleGuess}
                    placeholder="Enter your guess"
                    required
                    disabled={modal}
                  />
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={able.able1 || modal}
                  >
                    Submit
                  </button>
                  {able.able1 ? (
                    <p
                      style={{
                        color: "green",
                        textAlign: "center",
                        fontSize: "1.1rem",
                        fontWeight: "800",
                        textShadow:
                          "0 0 3px white, 0 0 5px white, 0 0 10px white, 0 0 15px white",
                      }}
                    >
                      Correct Answer!
                    </p>
                  ) : null}
                </div>
              </form>
            </div>
            {/* Seond Guess */}
            {attempts <= 8 && (
              <div className={styles.innerContent}>
                <div className={styles.descriptionContainer}>
                  <p style={{ color: "#F1F3FFFF" }}>Guess the object 2:</p>
                  <p style={{ color: "#F1F3FFFF" }}>{dataReceived2.category}</p>
                  <p style={{ color: "#F1F3FFFF" }}>
                    {dataReceived2.description}
                  </p>
                </div>

                <form onSubmit={handleSubmit2}>
                  <div className={styles.guessInputContainer}>
                    <input
                      type="text"
                      className={styles.guessInput}
                      value={guess2}
                      onChange={handleGuess2}
                      placeholder="Enter your guess"
                      required
                      disabled={modal}
                    />
                    <button
                      type="submit"
                      className={styles.submitButton}
                      disabled={able.able2 || modal}
                    >
                      Submit
                    </button>
                    {able.able2 ? (
                      <p
                        style={{
                          color: "green",
                          textAlign: "center",
                          fontSize: "1.1rem",
                          fontWeight: "800",
                          textShadow:
                            "0 0 3px white, 0 0 5px white, 0 0 10px white, 0 0 15px white",
                        }}
                      >
                        Correct Answer!
                      </p>
                    ) : null}
                  </div>
                </form>
              </div>
            )}
            {/* Starting of 3rd Guess */}/
            {attempts <= 3 && (
              <div className={styles.innerContent}>
                <div className={styles.descriptionContainer}>
                  <p style={{ color: "#F1F3FFFF" }}>Guess the object 3:</p>
                  <p style={{ color: "#F1F3FFFF" }}>{dataReceived3.category}</p>
                  <p style={{ color: "#F1F3FFFF" }}>
                    {dataReceived3.description}
                  </p>
                </div>
                <form onSubmit={handleSubmit3}>
                  <div className={styles.guessInputContainer}>
                    <input
                      type="text"
                      className={styles.guessInput}
                      value={guess3}
                      onChange={handleGuess3}
                      placeholder="Enter your guess"
                      required
                      disabled={modal}
                    />
                    <button
                      type="submit"
                      className={styles.submitButton}
                      disabled={able.able3 || modal}
                    >
                      Submit
                    </button>
                    {able.able3 ? (
                      <p
                        style={{
                          color: "green",
                          textAlign: "center",
                          fontSize: "1.1rem",
                          fontWeight: "800",
                          textShadow:
                            "0 0 3px white, 0 0 5px white, 0 0 10px white, 0 0 15px white",
                        }}
                      >
                        Correct Answer!
                      </p>
                    ) : null}
                  </div>
                </form>
              </div>
            )}
          </div>
          {finalAttempts <= 3 && attempts > 3 ? (
            <p
              className={`${styles.attemptsLabel} ${
                shakeAttempts ? styles.shake : ""
              }`}
              style={{ color: "red" }}
            >
              Attempts left: {modal ? finalAttempts - 3 : finalAttempts}
            </p>
          ) : (
            <p
              className={`${styles.attemptsLabel} ${
                shakeAttempts ? styles.shake : ""
              }`}
            >
              Attempts left: {modal ? finalAttempts - 3 : finalAttempts}
            </p>
          )}
        </div>
      </div>
      {guess === dataReceived.object && isSubmitted && modal && (
        <Modal
          message="You Won"
          leftAttempts={finalAttempts - 3}
          className={styles.modalMessage}
          finalScore={score}
          object1=""
          object2=""
          object3=""
          attempts={attempts}
        />
      )}
      {finalAttempts === 0 && modal && (
        <Modal
          message="You Lost"
          finalScore="0"
          leftAttempts={finalAttempts}
          object1={dataReceived.object}
          object2={attempts <= 8 ? dataReceived2.object : ""}
          object3={attempts <= 3 ? dataReceived3.object : ""}
          className={styles.modalMessage}
          attempts={attempts}
        />
      )}
    </div>
  );
}
