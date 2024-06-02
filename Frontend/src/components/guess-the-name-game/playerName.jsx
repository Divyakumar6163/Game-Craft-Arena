import { useState, useEffect } from "react";
import styles from "./playerName.module.css";
export default function PlayerName({
  playerNameFinal,
  changePlayerName,
  checkName,
  isRobot,
}) {
  const [name, setName] = useState({
    player1: !isRobot
      ? sessionStorage.getItem("mpplayer1")
      : sessionStorage.getItem("spplayer1") || "",
    player2: !isRobot ? sessionStorage.getItem("mpplayer2") : "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  function handleName(e) {
    const { name, value } = e.target;
    setName((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  useEffect(() => {
    playerNameFinal(name);
  }, [name, playerNameFinal]);

  function handleClick() {
    if (
      !isRobot
        ? name.player1 === null || name.player2 === null
        : name.player1 === null
    ) {
      setIsSubmit(true);
      // console.log(name);
      return;
    }
    if (!isRobot) {
      sessionStorage.setItem("mpplayer1", name.player1);
      sessionStorage.setItem("mpplayer2", name.player2);
    } else {
      sessionStorage.setItem("spplayer1", name.player1);
    }
    changePlayerName(false);
    // console.log(name);
  }
  if (
    !isRobot ? name.player1 === "" || name.player2 === "" : name.player1 === ""
  ) {
    checkName(true);
  } else {
    checkName(true);
  }
  console.log(name);
  return (
    <div
      className={styles.containerPlayer}
      style={{ height: `${isRobot ? "27vh" : "35vh"}` }}
    >
      <h2 style={{ color: "#F1F3FFFF", fontSize: "20px" }}>
        Enter Player Names
      </h2>
      <div className={styles.container}>
        <label className={styles.h2}>
          Enter Player {isRobot ? "" : 1} Name:{" "}
        </label>
        <input
          className={styles.input}
          type="text"
          name="player1"
          value={name.player1}
          onChange={handleName}
        />
      </div>
      {!isRobot && (
        <div className={styles.container}>
          <label className={styles.h2}>Enter Player 2 Name: </label>
          <input
            className={styles.input}
            type="text"
            name="player2"
            value={name.player2}
            onChange={handleName}
          />
        </div>
      )}
      <button type="submit" className={styles.button} onClick={handleClick}>
        Save
      </button>
      {(!isRobot
        ? name.player1 === "" || name.player2 === ""
        : name.player1 === "") &&
        isSubmit && (
          <p
            className={`${styles.message} ${
              (
                !isRobot
                  ? name.player1 === "" || name.player2 === ""
                  : name.player1 === ""
              )
                ? styles.shake
                : ""
            }`}
          >
            Please Enter Valid Name!
          </p>
        )}
    </div>
  );
}
