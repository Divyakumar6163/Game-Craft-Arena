import style from "./modal.module.css";
import { useNavigate } from "react-router-dom";
export default function Modal({ message, leftAttempts, finalScore }) {
  const navigate = useNavigate();
  function handleRestart() {
    navigate("/player1");
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
      <p className={style.p}>Attempts Left:{leftAttempts}</p>
      <p className={style.p}>Score:{finalScore}</p>
      <button onClick={handleLevel} className={style.button}>
        Level
      </button>
      <button onClick={handleRestart} className={style.button}>
        Restart
      </button>
    </dialog>
  );
}
