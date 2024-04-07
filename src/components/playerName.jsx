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
      <div className={styles.container}>
        <h2 className={styles.h2}>Enter Player1 name:</h2>
        <input
          type="text"
          name="player1"
          value={name.player1}
          onChange={handleName}
          // className={styles.player - input}
        />
      </div>
      <div className={styles.container}>
        <h2 className={styles.h2}>Enter Player2 name:</h2>
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
