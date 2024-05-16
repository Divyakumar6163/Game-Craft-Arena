import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "./modal";
import styles from "./player2.module.css";
import RestartModal from "./restartModal";
export default function Player2({
  dataReceive,
  dataReceive2,
  dataReceive3,
  attempts,
  player1Name,
  player2Name,
  isRobot,
  playingChoiceImg,
}) {
  const [finalAttempts, setFinalAttempts] = useState(attempts);
  const [guess, setGuess] = useState("");
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
  const [dataReceived, setDataReceived] = useState(dataReceive);
  const [dataReceived2, setDataReceived2] = useState(dataReceive2);
  const [dataReceived3, setDataReceived3] = useState(dataReceive3);
  const [restartModal, setRestartModal] = useState(false);
  const [runUseEffectAgain, setRunUseEffectAgain] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (isRobot) {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:8000/player2");
          setDataReceived(
            response.data[Math.floor(Math.random() * response.data.length)]
          );
          setDataReceived2(
            response.data[Math.floor(Math.random() * response.data.length)]
          );
          setDataReceived3(
            response.data[Math.floor(Math.random() * response.data.length)]
          );
          // setLoading(false);
        } catch (err) {
          console.log(err);
          // setError(error);
          // setLoading(false);
        }
      };

      fetchData();
      // if (loading) {
      //   return <p>Loading...</p>;
      // }
      // if (error) {
      //   return <p>Error loading data: {error.message}</p>;
      // }
    }
  }, [runUseEffectAgain, isRobot]);
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
    if (guess.toLowerCase() !== dataReceived.object.toLowerCase()) {
      setFinalAttempts((finalAttempts) => finalAttempts - 1);
      setIsSubmitted(false);
      setShakeAttempts(true);
      setTimeout(() => setShakeAttempts(false), 500);
    } else if (guess.toLowerCase() === dataReceived.object.toLowerCase()) {
      setFinalAttempts((finalAttempts) => finalAttempts - -3);
      setIsSubmitted(true);
      setAble((prevState) => ({ ...prevState, able1: true }));
      setScore(Math.round((finalAttempts * 100) / attempts));
    }
    console.log(finalAttempts);
    if (
      attempts > 8 &&
      attempts <= 12 &&
      guess.toLowerCase() === dataReceived.object.toLowerCase()
    ) {
      setModal(true);
    }
    if (
      attempts > 3 &&
      attempts <= 8 &&
      guess.toLowerCase() === dataReceived.object.toLowerCase() &&
      guess2.toLowerCase() === dataReceived2.object.toLowerCase()
    ) {
      setModal(true);
    }
    if (
      attempts <= 3 &&
      guess.toLowerCase() === dataReceived.object.toLowerCase() &&
      guess2.toLowerCase() === dataReceived2.object.toLowerCase() &&
      guess3.toLowerCase() === dataReceived3.object.toLowerCase()
    ) {
      setModal(true);
    }
  }

  function handleSubmit2(event) {
    event.preventDefault();
    if (guess2.toLowerCase() !== dataReceived2.object.toLowerCase()) {
      setFinalAttempts((finalAttempts) => finalAttempts - 1);
      setIsSubmitted(false);
      setShakeAttempts(true);
      setTimeout(() => setShakeAttempts(false), 500);
    } else if (guess2.toLowerCase() === dataReceived2.object.toLowerCase()) {
      setFinalAttempts((finalAttempts) => finalAttempts - -3);
      setIsSubmitted(true);
      setAble((prevState) => ({ ...prevState, able2: true }));
      setScore(Math.round((finalAttempts * 100) / attempts));
    }
    console.log(finalAttempts);
    if (
      attempts > 8 &&
      attempts <= 12 &&
      guess.toLowerCase() === dataReceived.object.toLowerCase()
    ) {
      setModal(true);
    }
    if (
      attempts > 3 &&
      attempts <= 8 &&
      guess.toLowerCase() === dataReceived.object.toLowerCase() &&
      guess2.toLowerCase() === dataReceived2.object.toLowerCase()
    ) {
      setModal(true);
    } else if (
      attempts <= 3 &&
      guess.toLowerCase() === dataReceived.object.toLowerCase() &&
      guess2.toLowerCase() === dataReceived2.object.toLowerCase() &&
      guess3.toLowerCase() === dataReceived3.object.toLowerCase()
    ) {
      setModal(true);
    }
  }
  function handleSubmit3(event) {
    event.preventDefault();
    if (guess3.toLowerCase() !== dataReceived3.object.toLowerCase()) {
      setFinalAttempts((finalAttempts) => finalAttempts - 1);
      setIsSubmitted(false);
      setShakeAttempts(true);
      setTimeout(() => setShakeAttempts(false), 500);
    } else if (guess3.toLowerCase() === dataReceived3.object.toLowerCase()) {
      setFinalAttempts((finalAttempts) => finalAttempts - -3);
      setIsSubmitted(true);
      setAble((prevState) => ({ ...prevState, able3: true }));
      setScore(Math.round((finalAttempts * 100) / attempts));
    }
    console.log(finalAttempts);
    if (
      attempts > 8 &&
      attempts <= 12 &&
      guess.toLowerCase() === dataReceived.object.toLowerCase()
    ) {
      setModal(true);
    } else if (
      attempts > 3 &&
      attempts <= 8 &&
      guess.toLowerCase() === dataReceived.object.toLowerCase() &&
      guess2.toLowerCase() === dataReceived2.object.toLowerCase()
    ) {
      setModal(true);
    } else if (
      attempts <= 3 &&
      guess.toLowerCase() === dataReceived.object.toLowerCase() &&
      guess2.toLowerCase() === dataReceived2.object.toLowerCase() &&
      guess3.toLowerCase() === dataReceived3.object.toLowerCase()
    ) {
      setModal(true);
    }
  }
  function handleBack() {
    if (!isRobot) navigate("/player1");
    else navigate("/levels");
  }
  function handleRestart() {
    setRestartModal(true);
  }
  const resethandler = () => {
    setRunUseEffectAgain((prev) => !prev);
    setFinalAttempts(attempts);
    setGuess("");
    setGuess2("");
    setGuess3("");
    setAble({
      able1: false,
      able2: false,
      able3: false,
    });
  };
  return (
    <div className={styles.mainContainer}>
      <button className={styles.backButton} onClick={handleBack}>
        Back
      </button>
      <button
        className={styles.restartButton}
        onClick={handleRestart}
        disabled={
          modal ||
          (finalAttempts === 0 &&
            ((attempts <= 3 &&
              ((guess.toLowerCase() !== dataReceived.object.toLowerCase() &&
                guess2.toLowerCase() !== dataReceived2.object.toLowerCase() &&
                guess3.toLowerCase() !== dataReceived3.object.toLowerCase()) ||
                (guess.toLowerCase() !== dataReceived.object.toLowerCase() &&
                  guess2.toLowerCase() !== dataReceived2.object.toLowerCase() &&
                  guess3.toLowerCase() ===
                    dataReceived3.object.toLowerCase()) ||
                (guess.toLowerCase() !== dataReceived.object.toLowerCase() &&
                  guess2.toLowerCase() === dataReceived2.object.toLowerCase() &&
                  guess3.toLowerCase() !==
                    dataReceived3.object.toLowerCase()) ||
                (guess.toLowerCase() !== dataReceived.object.toLowerCase() &&
                  guess2.toLowerCase() === dataReceived2.object.toLowerCase() &&
                  guess3.toLowerCase() ===
                    dataReceived3.object.toLowerCase()) ||
                (guess.toLowerCase() === dataReceived.object.toLowerCase() &&
                  guess2.toLowerCase() !== dataReceived2.object.toLowerCase() &&
                  guess3.toLowerCase() !==
                    dataReceived3.object.toLowerCase()) ||
                (guess.toLowerCase() === dataReceived.object.toLowerCase() &&
                  guess2.toLowerCase() !== dataReceived2.object.toLowerCase() &&
                  guess3.toLowerCase() ===
                    dataReceived3.object.toLowerCase()) ||
                (guess.toLowerCase() === dataReceived.object.toLowerCase() &&
                  guess2.toLowerCase() === dataReceived2.object.toLowerCase() &&
                  guess3.toLowerCase() !==
                    dataReceived3.object.toLowerCase()))) ||
              (attempts > 3 &&
                attempts <= 8 &&
                ((guess.toLowerCase() !== dataReceived.object.toLowerCase() &&
                  guess2.toLowerCase() !==
                    dataReceived2.object.toLowerCase()) ||
                  (guess.toLowerCase() === dataReceived.object.toLowerCase() &&
                    guess2.toLowerCase() !==
                      dataReceived2.object.toLowerCase()) ||
                  (guess.toLowerCase() !== dataReceived.object.toLowerCase() &&
                    guess2.toLowerCase() ===
                      dataReceived2.object.toLowerCase()))) ||
              (attempts > 8 &&
                attempts <= 12 &&
                guess.toLowerCase() !== dataReceived.object.toLowerCase())))
        }
      >
        Restart
      </button>
      <div
        className={styles.playerContainer}
        style={{
          opacity:
            modal ||
            (finalAttempts === 0 &&
              ((attempts <= 3 &&
                ((guess.toLowerCase() !== dataReceived.object.toLowerCase() &&
                  guess2.toLowerCase() !== dataReceived2.object.toLowerCase() &&
                  guess3.toLowerCase() !==
                    dataReceived3.object.toLowerCase()) ||
                  (guess.toLowerCase() !== dataReceived.object.toLowerCase() &&
                    guess2.toLowerCase() !==
                      dataReceived2.object.toLowerCase() &&
                    guess3.toLowerCase() ===
                      dataReceived3.object.toLowerCase()) ||
                  (guess.toLowerCase() !== dataReceived.object.toLowerCase() &&
                    guess2.toLowerCase() ===
                      dataReceived2.object.toLowerCase() &&
                    guess3.toLowerCase() !==
                      dataReceived3.object.toLowerCase()) ||
                  (guess.toLowerCase() !== dataReceived.object.toLowerCase() &&
                    guess2.toLowerCase() ===
                      dataReceived2.object.toLowerCase() &&
                    guess3.toLowerCase() ===
                      dataReceived3.object.toLowerCase()) ||
                  (guess.toLowerCase() === dataReceived.object.toLowerCase() &&
                    guess2.toLowerCase() !==
                      dataReceived2.object.toLowerCase() &&
                    guess3.toLowerCase() !==
                      dataReceived3.object.toLowerCase()) ||
                  (guess.toLowerCase() === dataReceived.object.toLowerCase() &&
                    guess2.toLowerCase() !==
                      dataReceived2.object.toLowerCase() &&
                    guess3.toLowerCase() ===
                      dataReceived3.object.toLowerCase()) ||
                  (guess.toLowerCase() === dataReceived.object.toLowerCase() &&
                    guess2.toLowerCase() ===
                      dataReceived2.object.toLowerCase() &&
                    guess3.toLowerCase() !==
                      dataReceived3.object.toLowerCase()))) ||
                (attempts > 3 &&
                  attempts <= 8 &&
                  ((guess.toLowerCase() !== dataReceived.object.toLowerCase() &&
                    guess2.toLowerCase() !==
                      dataReceived2.object.toLowerCase()) ||
                    (guess.toLowerCase() ===
                      dataReceived.object.toLowerCase() &&
                      guess2.toLowerCase() !==
                        dataReceived2.object.toLowerCase()) ||
                    (guess.toLowerCase() !==
                      dataReceived.object.toLowerCase() &&
                      guess2.toLowerCase() ===
                        dataReceived2.object.toLowerCase()))) ||
                (attempts > 8 &&
                  attempts <= 12 &&
                  guess.toLowerCase() !==
                    dataReceived.object.toLowerCase()))) ||
            restartModal
              ? 0.05
              : 1,
        }}
      >
        <h2 className={styles.title}>
          Player {isRobot ? "" : 2}-{isRobot ? player1Name : player2Name}
        </h2>
        <div className={styles.innerContainer}>
          <div
            style={{
              display: "flex",
              displayDirection: "row",
              minHeight: "20rem",
            }}
          >
            <div className={styles.innerContent}>
              <div className={styles.descriptionContainer}>
                <p style={{ color: "#F1F3FFFF" }}>
                  Guess the object {attempts <= 8 && "1"}:
                </p>
                {!playingChoiceImg && (
                  <p style={{ color: "#F1F3FFFF" }}>{dataReceived.category}</p>
                )}
                {!playingChoiceImg && (
                  <p style={{ color: "#F1F3FFFF" }}>
                    {dataReceived.description}
                  </p>
                )}
                {playingChoiceImg && (
                  <img
                    className={styles.image}
                    src={dataReceived.image}
                    alt="Img Not Found"
                  ></img>
                )}
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
                    disabled={
                      modal ||
                      (finalAttempts === 0 &&
                        ((attempts <= 3 &&
                          ((guess.toLowerCase() !==
                            dataReceived.object.toLowerCase() &&
                            guess2.toLowerCase() !==
                              dataReceived2.object.toLowerCase() &&
                            guess3.toLowerCase() !==
                              dataReceived3.object.toLowerCase()) ||
                            (guess.toLowerCase() !==
                              dataReceived.object.toLowerCase() &&
                              guess2.toLowerCase() !==
                                dataReceived2.object.toLowerCase() &&
                              guess3.toLowerCase() ===
                                dataReceived3.object.toLowerCase()) ||
                            (guess.toLowerCase() !==
                              dataReceived.object.toLowerCase() &&
                              guess2.toLowerCase() ===
                                dataReceived2.object.toLowerCase() &&
                              guess3.toLowerCase() !==
                                dataReceived3.object.toLowerCase()) ||
                            (guess.toLowerCase() !==
                              dataReceived.object.toLowerCase() &&
                              guess2.toLowerCase() ===
                                dataReceived2.object.toLowerCase() &&
                              guess3.toLowerCase() ===
                                dataReceived3.object.toLowerCase()) ||
                            (guess.toLowerCase() ===
                              dataReceived.object.toLowerCase() &&
                              guess2.toLowerCase() !==
                                dataReceived2.object.toLowerCase() &&
                              guess3.toLowerCase() !==
                                dataReceived3.object.toLowerCase()) ||
                            (guess.toLowerCase() ===
                              dataReceived.object.toLowerCase() &&
                              guess2.toLowerCase() !==
                                dataReceived2.object.toLowerCase() &&
                              guess3.toLowerCase() ===
                                dataReceived3.object.toLowerCase()) ||
                            (guess.toLowerCase() ===
                              dataReceived.object.toLowerCase() &&
                              guess2.toLowerCase() ===
                                dataReceived2.object.toLowerCase() &&
                              guess3.toLowerCase() !==
                                dataReceived3.object.toLowerCase()))) ||
                          (attempts > 3 &&
                            attempts <= 8 &&
                            ((guess.toLowerCase() !==
                              dataReceived.object.toLowerCase() &&
                              guess2.toLowerCase() !==
                                dataReceived2.object.toLowerCase()) ||
                              (guess.toLowerCase() ===
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() !==
                                  dataReceived2.object.toLowerCase()) ||
                              (guess.toLowerCase() !==
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() ===
                                  dataReceived2.object.toLowerCase()))) ||
                          (attempts > 8 &&
                            attempts <= 12 &&
                            guess.toLowerCase() !==
                              dataReceived.object.toLowerCase()))) ||
                      restartModal
                    }
                  />
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={
                      able.able1 ||
                      modal ||
                      (finalAttempts === 0 &&
                        ((attempts <= 3 &&
                          ((guess.toLowerCase() !==
                            dataReceived.object.toLowerCase() &&
                            guess2.toLowerCase() !==
                              dataReceived2.object.toLowerCase() &&
                            guess3.toLowerCase() !==
                              dataReceived3.object.toLowerCase()) ||
                            (guess.toLowerCase() !==
                              dataReceived.object.toLowerCase() &&
                              guess2.toLowerCase() !==
                                dataReceived2.object.toLowerCase() &&
                              guess3.toLowerCase() ===
                                dataReceived3.object.toLowerCase()) ||
                            (guess.toLowerCase() !==
                              dataReceived.object.toLowerCase() &&
                              guess2.toLowerCase() ===
                                dataReceived2.object.toLowerCase() &&
                              guess3.toLowerCase() !==
                                dataReceived3.object.toLowerCase()) ||
                            (guess.toLowerCase() !==
                              dataReceived.object.toLowerCase() &&
                              guess2.toLowerCase() ===
                                dataReceived2.object.toLowerCase() &&
                              guess3.toLowerCase() ===
                                dataReceived3.object.toLowerCase()) ||
                            (guess.toLowerCase() ===
                              dataReceived.object.toLowerCase() &&
                              guess2.toLowerCase() !==
                                dataReceived2.object.toLowerCase() &&
                              guess3.toLowerCase() !==
                                dataReceived3.object.toLowerCase()) ||
                            (guess.toLowerCase() ===
                              dataReceived.object.toLowerCase() &&
                              guess2.toLowerCase() !==
                                dataReceived2.object.toLowerCase() &&
                              guess3.toLowerCase() ===
                                dataReceived3.object.toLowerCase()) ||
                            (guess.toLowerCase() ===
                              dataReceived.object.toLowerCase() &&
                              guess2.toLowerCase() ===
                                dataReceived2.object.toLowerCase() &&
                              guess3.toLowerCase() !==
                                dataReceived3.object.toLowerCase()))) ||
                          (attempts > 3 &&
                            attempts <= 8 &&
                            ((guess.toLowerCase() !==
                              dataReceived.object.toLowerCase() &&
                              guess2.toLowerCase() !==
                                dataReceived2.object.toLowerCase()) ||
                              (guess.toLowerCase() ===
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() !==
                                  dataReceived2.object.toLowerCase()) ||
                              (guess.toLowerCase() !==
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() ===
                                  dataReceived2.object.toLowerCase()))) ||
                          (attempts > 8 &&
                            attempts <= 12 &&
                            guess.toLowerCase() !==
                              dataReceived.object.toLowerCase()))) ||
                      restartModal
                    }
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
                  {!playingChoiceImg && (
                    <p style={{ color: "#F1F3FFFF" }}>
                      {dataReceived2.category}
                    </p>
                  )}
                  {!playingChoiceImg && (
                    <p style={{ color: "#F1F3FFFF" }}>
                      {dataReceived2.description}
                    </p>
                  )}
                  {playingChoiceImg && (
                    <img
                      className={styles.image}
                      src={dataReceived2.image}
                      alt="Img Not Found"
                    ></img>
                  )}
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
                      disabled={
                        modal ||
                        (finalAttempts === 0 &&
                          ((attempts <= 3 &&
                            ((guess.toLowerCase() !==
                              dataReceived.object.toLowerCase() &&
                              guess2.toLowerCase() !==
                                dataReceived2.object.toLowerCase() &&
                              guess3.toLowerCase() !==
                                dataReceived3.object.toLowerCase()) ||
                              (guess.toLowerCase() !==
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() !==
                                  dataReceived2.object.toLowerCase() &&
                                guess3.toLowerCase() ===
                                  dataReceived3.object.toLowerCase()) ||
                              (guess.toLowerCase() !==
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() ===
                                  dataReceived2.object.toLowerCase() &&
                                guess3.toLowerCase() !==
                                  dataReceived3.object.toLowerCase()) ||
                              (guess.toLowerCase() !==
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() ===
                                  dataReceived2.object.toLowerCase() &&
                                guess3.toLowerCase() ===
                                  dataReceived3.object.toLowerCase()) ||
                              (guess.toLowerCase() ===
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() !==
                                  dataReceived2.object.toLowerCase() &&
                                guess3.toLowerCase() !==
                                  dataReceived3.object.toLowerCase()) ||
                              (guess.toLowerCase() ===
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() !==
                                  dataReceived2.object.toLowerCase() &&
                                guess3.toLowerCase() ===
                                  dataReceived3.object.toLowerCase()) ||
                              (guess.toLowerCase() ===
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() ===
                                  dataReceived2.object.toLowerCase() &&
                                guess3.toLowerCase() !==
                                  dataReceived3.object.toLowerCase()))) ||
                            (attempts > 3 &&
                              attempts <= 8 &&
                              ((guess.toLowerCase() !==
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() !==
                                  dataReceived2.object.toLowerCase()) ||
                                (guess.toLowerCase() ===
                                  dataReceived.object.toLowerCase() &&
                                  guess2.toLowerCase() !==
                                    dataReceived2.object.toLowerCase()) ||
                                (guess.toLowerCase() !==
                                  dataReceived.object.toLowerCase() &&
                                  guess2.toLowerCase() ===
                                    dataReceived2.object.toLowerCase()))) ||
                            (attempts > 8 &&
                              attempts <= 12 &&
                              guess.toLowerCase() !==
                                dataReceived.object.toLowerCase()))) ||
                        restartModal
                      }
                    />
                    <button
                      type="submit"
                      className={styles.submitButton}
                      disabled={
                        able.able2 ||
                        modal ||
                        (finalAttempts === 0 &&
                          ((attempts <= 3 &&
                            ((guess.toLowerCase() !==
                              dataReceived.object.toLowerCase() &&
                              guess2.toLowerCase() !==
                                dataReceived2.object.toLowerCase() &&
                              guess3.toLowerCase() !==
                                dataReceived3.object.toLowerCase()) ||
                              (guess.toLowerCase() !==
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() !==
                                  dataReceived2.object.toLowerCase() &&
                                guess3.toLowerCase() ===
                                  dataReceived3.object.toLowerCase()) ||
                              (guess.toLowerCase() !==
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() ===
                                  dataReceived2.object.toLowerCase() &&
                                guess3.toLowerCase() !==
                                  dataReceived3.object.toLowerCase()) ||
                              (guess.toLowerCase() !==
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() ===
                                  dataReceived2.object.toLowerCase() &&
                                guess3.toLowerCase() ===
                                  dataReceived3.object.toLowerCase()) ||
                              (guess.toLowerCase() ===
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() !==
                                  dataReceived2.object.toLowerCase() &&
                                guess3.toLowerCase() !==
                                  dataReceived3.object.toLowerCase()) ||
                              (guess.toLowerCase() ===
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() !==
                                  dataReceived2.object.toLowerCase() &&
                                guess3.toLowerCase() ===
                                  dataReceived3.object.toLowerCase()) ||
                              (guess.toLowerCase() ===
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() ===
                                  dataReceived2.object.toLowerCase() &&
                                guess3.toLowerCase() !==
                                  dataReceived3.object.toLowerCase()))) ||
                            (attempts > 3 &&
                              attempts <= 8 &&
                              ((guess.toLowerCase() !==
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() !==
                                  dataReceived2.object.toLowerCase()) ||
                                (guess.toLowerCase() ===
                                  dataReceived.object.toLowerCase() &&
                                  guess2.toLowerCase() !==
                                    dataReceived2.object.toLowerCase()) ||
                                (guess.toLowerCase() !==
                                  dataReceived.object.toLowerCase() &&
                                  guess2.toLowerCase() ===
                                    dataReceived2.object.toLowerCase()))) ||
                            (attempts > 8 &&
                              attempts <= 12 &&
                              guess.toLowerCase() !==
                                dataReceived.object.toLowerCase()))) ||
                        restartModal
                      }
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
                  {!playingChoiceImg && (
                    <p style={{ color: "#F1F3FFFF" }}>
                      {dataReceived3.category}
                    </p>
                  )}
                  {!playingChoiceImg && (
                    <p style={{ color: "#F1F3FFFF" }}>
                      {dataReceived3.description}
                    </p>
                  )}
                  {playingChoiceImg && (
                    <img
                      className={styles.image}
                      src={dataReceived3.image}
                      alt="Img Not Found"
                    ></img>
                  )}
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
                      disabled={
                        modal ||
                        (finalAttempts === 0 &&
                          ((attempts <= 3 &&
                            ((guess.toLowerCase() !==
                              dataReceived.object.toLowerCase() &&
                              guess2.toLowerCase() !==
                                dataReceived2.object.toLowerCase() &&
                              guess3.toLowerCase() !==
                                dataReceived3.object.toLowerCase()) ||
                              (guess.toLowerCase() !==
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() !==
                                  dataReceived2.object.toLowerCase() &&
                                guess3.toLowerCase() ===
                                  dataReceived3.object.toLowerCase()) ||
                              (guess.toLowerCase() !==
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() ===
                                  dataReceived2.object.toLowerCase() &&
                                guess3.toLowerCase() !==
                                  dataReceived3.object.toLowerCase()) ||
                              (guess.toLowerCase() !==
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() ===
                                  dataReceived2.object.toLowerCase() &&
                                guess3.toLowerCase() ===
                                  dataReceived3.object.toLowerCase()) ||
                              (guess.toLowerCase() ===
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() !==
                                  dataReceived2.object.toLowerCase() &&
                                guess3.toLowerCase() !==
                                  dataReceived3.object.toLowerCase()) ||
                              (guess.toLowerCase() ===
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() !==
                                  dataReceived2.object.toLowerCase() &&
                                guess3.toLowerCase() ===
                                  dataReceived3.object.toLowerCase()) ||
                              (guess.toLowerCase() ===
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() ===
                                  dataReceived2.object.toLowerCase() &&
                                guess3.toLowerCase() !==
                                  dataReceived3.object.toLowerCase()))) ||
                            (attempts > 3 &&
                              attempts <= 8 &&
                              ((guess.toLowerCase() !==
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() !==
                                  dataReceived2.object.toLowerCase()) ||
                                (guess.toLowerCase() ===
                                  dataReceived.object.toLowerCase() &&
                                  guess2.toLowerCase() !==
                                    dataReceived2.object.toLowerCase()) ||
                                (guess.toLowerCase() !==
                                  dataReceived.object.toLowerCase() &&
                                  guess2.toLowerCase() ===
                                    dataReceived2.object.toLowerCase()))) ||
                            (attempts > 8 &&
                              attempts <= 12 &&
                              guess.toLowerCase() !==
                                dataReceived.object.toLowerCase()))) ||
                        restartModal
                      }
                    />
                    <button
                      type="submit"
                      className={styles.submitButton}
                      disabled={
                        able.able3 ||
                        modal ||
                        (finalAttempts === 0 &&
                          ((attempts <= 3 &&
                            ((guess.toLowerCase() !==
                              dataReceived.object.toLowerCase() &&
                              guess2.toLowerCase() !==
                                dataReceived2.object.toLowerCase() &&
                              guess3.toLowerCase() !==
                                dataReceived3.object.toLowerCase()) ||
                              (guess.toLowerCase() !==
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() !==
                                  dataReceived2.object.toLowerCase() &&
                                guess3.toLowerCase() ===
                                  dataReceived3.object.toLowerCase()) ||
                              (guess.toLowerCase() !==
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() ===
                                  dataReceived2.object.toLowerCase() &&
                                guess3.toLowerCase() !==
                                  dataReceived3.object.toLowerCase()) ||
                              (guess.toLowerCase() !==
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() ===
                                  dataReceived2.object.toLowerCase() &&
                                guess3.toLowerCase() ===
                                  dataReceived3.object.toLowerCase()) ||
                              (guess.toLowerCase() ===
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() !==
                                  dataReceived2.object.toLowerCase() &&
                                guess3.toLowerCase() !==
                                  dataReceived3.object.toLowerCase()) ||
                              (guess.toLowerCase() ===
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() !==
                                  dataReceived2.object.toLowerCase() &&
                                guess3.toLowerCase() ===
                                  dataReceived3.object.toLowerCase()) ||
                              (guess.toLowerCase() ===
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() ===
                                  dataReceived2.object.toLowerCase() &&
                                guess3.toLowerCase() !==
                                  dataReceived3.object.toLowerCase()))) ||
                            (attempts > 3 &&
                              attempts <= 8 &&
                              ((guess.toLowerCase() !==
                                dataReceived.object.toLowerCase() &&
                                guess2.toLowerCase() !==
                                  dataReceived2.object.toLowerCase()) ||
                                (guess.toLowerCase() ===
                                  dataReceived.object.toLowerCase() &&
                                  guess2.toLowerCase() !==
                                    dataReceived2.object.toLowerCase()) ||
                                (guess.toLowerCase() !==
                                  dataReceived.object.toLowerCase() &&
                                  guess2.toLowerCase() ===
                                    dataReceived2.object.toLowerCase()))) ||
                            (attempts > 8 &&
                              attempts <= 12 &&
                              guess.toLowerCase() !==
                                dataReceived.object.toLowerCase()))) ||
                        restartModal
                      }
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
      {guess.toLowerCase() === dataReceived.object.toLowerCase() &&
        isSubmitted &&
        modal && (
          <Modal
            message="You Won"
            leftAttempts={finalAttempts - 3}
            className={styles.modalMessage}
            finalScore={score}
            object1=""
            object2=""
            object3=""
            attempts={attempts}
            isRobot={isRobot}
            setModal={setModal}
            resethandler={resethandler}
          />
        )}
      {finalAttempts === 0 &&
        ((attempts <= 3 &&
          ((guess.toLowerCase() !== dataReceived.object.toLowerCase() &&
            guess2.toLowerCase() !== dataReceived2.object.toLowerCase() &&
            guess3.toLowerCase() !== dataReceived3.object.toLowerCase()) ||
            (guess.toLowerCase() !== dataReceived.object.toLowerCase() &&
              guess2.toLowerCase() !== dataReceived2.object.toLowerCase() &&
              guess3.toLowerCase() === dataReceived3.object.toLowerCase()) ||
            (guess.toLowerCase() !== dataReceived.object.toLowerCase() &&
              guess2.toLowerCase() === dataReceived2.object.toLowerCase() &&
              guess3.toLowerCase() !== dataReceived3.object.toLowerCase()) ||
            (guess.toLowerCase() !== dataReceived.object.toLowerCase() &&
              guess2.toLowerCase() === dataReceived2.object.toLowerCase() &&
              guess3.toLowerCase() === dataReceived3.object.toLowerCase()) ||
            (guess.toLowerCase() === dataReceived.object.toLowerCase() &&
              guess2.toLowerCase() !== dataReceived2.object.toLowerCase() &&
              guess3.toLowerCase() !== dataReceived3.object.toLowerCase()) ||
            (guess.toLowerCase() === dataReceived.object.toLowerCase() &&
              guess2.toLowerCase() !== dataReceived2.object.toLowerCase() &&
              guess3.toLowerCase() === dataReceived3.object.toLowerCase()) ||
            (guess.toLowerCase() === dataReceived.object.toLowerCase() &&
              guess2.toLowerCase() === dataReceived2.object.toLowerCase() &&
              guess3.toLowerCase() !== dataReceived3.object.toLowerCase()))) ||
          (attempts > 3 &&
            attempts <= 8 &&
            ((guess.toLowerCase() !== dataReceived.object.toLowerCase() &&
              guess2.toLowerCase() !== dataReceived2.object.toLowerCase()) ||
              (guess.toLowerCase() === dataReceived.object.toLowerCase() &&
                guess2.toLowerCase() !== dataReceived2.object.toLowerCase()) ||
              (guess.toLowerCase() !== dataReceived.object.toLowerCase() &&
                guess2.toLowerCase() ===
                  dataReceived2.object.toLowerCase()))) ||
          (attempts > 8 &&
            attempts <= 12 &&
            guess.toLowerCase() !== dataReceived.object.toLowerCase())) && (
          <Modal
            message="You Lost"
            finalScore="0"
            leftAttempts={finalAttempts}
            object1={dataReceived.object}
            object2={attempts <= 8 ? dataReceived2.object : ""}
            object3={attempts <= 3 ? dataReceived3.object : ""}
            className={styles.modalMessage}
            attempts={attempts}
            isRobot={isRobot}
            setModal={setModal}
            resethandler={resethandler}
          />
        )}
      <div>
        {restartModal && !modal && (
          <RestartModal
            setRestartModal={setRestartModal}
            isRobot={isRobot}
            resethandler={resethandler}
          />
        )}
      </div>
    </div>
  );
}
