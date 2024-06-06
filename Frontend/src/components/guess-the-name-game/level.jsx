import Button from "./button";
import styleLevel from "./level.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PlayerName from "./playerName";
import Header from "./header";
export default function Levels({
  playerAttempts,
  playerNameData,
  setCheckName,
  isRobot,
}) {
  const navigate = useNavigate();
  const [changeName, setChangeName] = useState(false);
  function handleAttempts(attempts) {
    playerAttempts(attempts);
    setTimeout(() => {
      if (isRobot) navigate("/guess-the-object/player2");
      else navigate("/guess-the-object/player1");
    }, 0);
  }

  const ismpName =
    sessionStorage.getItem("mpplayer1") && sessionStorage.getItem("mpplayer2");
  const isspName = sessionStorage.getItem("spplayer1");

  function handleClick() {
    setChangeName(true);
  }
  function handleBack() {
    if (changeName) {
      setCheckName(false);
    }
    navigate("/guess-the-object/choice");
  }
  return (
    <>
      <Header />
      <div className={styleLevel.mainContainer}>
        <button className={styleLevel.backButton} onClick={handleBack}>
          Back
        </button>
        <section className={styleLevel.section}>
          {!changeName ? (
            <button className={styleLevel.button} onClick={handleClick}>
              Enter Player Name
            </button>
          ) : null}
          {changeName ? (
            <PlayerName
              isRobot={isRobot}
              playerNameFinal={playerNameData}
              changePlayerName={setChangeName}
              checkName={setCheckName}
            />
          ) : null}

          <h2 className={styleLevel.h2}>Levels</h2>
          <ul className={styleLevel.ul}>
            <li className={styleLevel.li}>
              <Button
                className={styleLevel.Button}
                onChange={() => handleAttempts("12")}
                disable={changeName || !(!isRobot ? ismpName : isspName)}
              >
                Beginner
              </Button>
            </li>
            <li className={styleLevel.li}>
              <Button
                className={styleLevel.Button}
                onChange={() => handleAttempts("10")}
                disable={changeName || !(!isRobot ? ismpName : isspName)}
              >
                Easy
              </Button>
            </li>
            <li className={styleLevel.li}>
              <Button
                className={styleLevel.Button}
                onChange={() => handleAttempts("8")}
                disable={changeName || !(!isRobot ? ismpName : isspName)}
              >
                Intermediate
              </Button>
            </li>
            <li className={styleLevel.li}>
              <Button
                className={styleLevel.Button}
                onChange={() => handleAttempts("5")}
                disable={changeName || !(!isRobot ? ismpName : isspName)}
              >
                Hard
              </Button>
            </li>
            <li className={styleLevel.li}>
              <Button
                className={styleLevel.Button}
                onChange={() => handleAttempts("3")}
                disable={changeName || !(!isRobot ? ismpName : isspName)}
              >
                Professtional
              </Button>
            </li>
          </ul>
          {!(!isRobot ? ismpName : isspName) ? (
            <p className={styleLevel.blinkingText}>Please Enter Your Names</p>
          ) : null}
        </section>
      </div>
    </>
  );
}
