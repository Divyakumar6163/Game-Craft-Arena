import Button from "./button";
import styleLevel from "./level.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PlayerName from "./playerName";
export default function Levels({ playerAttempts, playerNameData }) {
  const navigate = useNavigate();
  const [changeName, setChangeName] = useState(false);
  function handleAttempts(attempts) {
    playerAttempts(attempts);
    setTimeout(() => {
      navigate("/player1");
    }, 0);
  }
  function handleClick() {
    setChangeName(true);
  }
  return (
    <div className={styleLevel.mainContainer}>
      <section className={styleLevel.section}>
        {!changeName ? (
          <button className={styleLevel.button} onClick={handleClick}>
            Change Player Name
          </button>
        ) : null}
        {changeName ? (
          <PlayerName
            playerNameFinal={playerNameData}
            changePlayerName={setChangeName}
          />
        ) : null}

        <h2 className={styleLevel.h2}>Levels</h2>
        <ul className={styleLevel.ul}>
          <li className={styleLevel.li}>
            <Button
              className={styleLevel.Button}
              onChange={() => handleAttempts("12")}
            >
              Beginner
            </Button>
          </li>
          <li className={styleLevel.li}>
            <Button
              className={styleLevel.Button}
              onChange={() => handleAttempts("10")}
            >
              Easy
            </Button>
          </li>
          <li className={styleLevel.li}>
            <Button
              className={styleLevel.Button}
              onChange={() => handleAttempts("8")}
            >
              Intermediate
            </Button>
          </li>
          <li className={styleLevel.li}>
            <Button
              className={styleLevel.Button}
              onChange={() => handleAttempts("5")}
            >
              Hard
            </Button>
          </li>
          <li className={styleLevel.li}>
            <Button
              className={styleLevel.Button}
              onChange={() => handleAttempts("3")}
            >
              Professtional
            </Button>
          </li>
        </ul>
      </section>
    </div>
  );
}
