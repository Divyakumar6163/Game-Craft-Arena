import style from "./modal.module.css";
import { useNavigate } from "react-router-dom";
export default function Modal({
  message,
  leftAttempts,
  finalScore,
  object1,
  object2,
  object3,
  attempts,
  isRobot,
}) {
  const navigate = useNavigate();
  function handleRestart() {
    if (!isRobot) navigate("/player1");
    else {
      navigate("/");
    }
  }
  function handleLevel() {
    navigate("/levels");
  }
  return (
    <dialog open className={style.modal}>
      <h1
        className={style.h1}
        style={{ color: message === "You Won" ? "green" : "red" }}
      >
        {message}
      </h1>
      {object1 !== "" && (
        <p style={{ fontWeight: "800" }} className={style.p}>
          Object {attempts > 8 ? null : 1}: {object1}
        </p>
      )}
      {object2 !== "" && (
        <p style={{ fontWeight: "800" }} className={style.p}>
          Object 2: {object2}
        </p>
      )}
      {object3 !== "" && (
        <p style={{ fontWeight: "800" }} className={style.p}>
          Object 3: {object3}
        </p>
      )}
      <p className={style.p}>Attempts Left: {leftAttempts}</p>
      <p className={style.p}>Score: {finalScore}</p>
      <button onClick={handleLevel} className={style.button}>
        Level
      </button>
      <button onClick={handleRestart} className={style.button}>
        {isRobot ? "Home" : "Restart"}
      </button>
    </dialog>
  );
}
