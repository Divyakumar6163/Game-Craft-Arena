import { useState, useEffect } from "react";
import styles from "./playerName.module.css";
export default function PlayerName({ playerNameFinal, changePlayerName }) {
  const [name, setName] = useState({
    player1: "",
    player2: "",
  });

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
    changePlayerName(false);
  }
  return (
    <div className={styles.containerPlayer}>
      <h2 style={{ color: "#F1F3FFFF", fontSize: "20px" }}>
        Enter Player Names
      </h2>
      <div className={styles.container}>
        <label className={styles.h2}>Enter Player 1 Name:</label>
        <input
          type="text"
          name="player1"
          value={name.player1}
          onChange={handleName}
          // className={styles.player - input}
        />
      </div>
      <div className={styles.container}>
        <label className={styles.h2}>Enter Player 2 Name:</label>
        <input
          type="text"
          name="player2"
          value={name.player2}
          onChange={handleName}
        />
      </div>
      <button type="submit" className={styles.button} onClick={handleClick}>
        Save
      </button>
    </div>
  );
}
