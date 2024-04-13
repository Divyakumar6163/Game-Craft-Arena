import { useState, useEffect } from "react";
import styles from "./playerName.module.css";
export default function PlayerName({
  playerNameFinal,
  changePlayerName,
  checkName,
}) {
  const [name, setName] = useState({
    player1: "",
    player2: "",
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
    if (name.player1 === "" || name.player2 === "") {
      setIsSubmit(true);
      // console.log(name);
      return;
    }
    changePlayerName(false);
    // console.log(name);
  }
  if (name.player1 === "" || name.player2 === "") {
    checkName(true);
  } else {
    checkName(true);
  }

  return (
    <div className={styles.containerPlayer}>
      <h2 style={{ color: "#F1F3FFFF", fontSize: "20px" }}>
        Enter Player Names
      </h2>
      <div className={styles.container}>
        <label className={styles.h2}>Enter Player 1 Name: </label>
        <input
          className={styles.input}
          type="text"
          name="player1"
          value={name.player1}
          onChange={handleName}
          // className={styles.player - input}
        />
      </div>
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
      <button
        // disabled={name.player1 === "" || name.player2 === ""}
        type="submit"
        className={styles.button}
        onClick={handleClick}
      >
        Save
      </button>
      {(name.player1 === "" || name.player2 === "") && isSubmit && (
        <p
          className={`${styles.message} ${
            name.player1 === "" || name.player2 === "" ? styles.shake : ""
          }`}
        >
          Please Enter Valid Name!
        </p>
      )}
    </div>
  );
}
