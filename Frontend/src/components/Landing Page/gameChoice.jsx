import style from "./gameChoice.module.css";
import { useNavigate } from "react-router-dom";
import ClickHandler from "./ClickHandler";
// import MovingCards from "./movingCards";
export default function GameChoice() {
  const navigate = useNavigate();
  return (
    <div className={style.mainArea}>
      <header>
        <h1 className={style.h1}>Gaming Hub</h1>
      </header>
      <main className={style.main}>
        <div className={style.buttonContainer}>
          <h1 className={style.title}>Choose Your Game</h1>
          <div className={style.container}>
            <button
              onClick={ClickHandler(navigate, "/guess-the-object")}
              className={style.button}
            >
              Guess The Object
            </button>
            <button
              onClick={ClickHandler(navigate, "/tic-tac-toe")}
              className={style.button}
            >
              Tic Tac Toe
            </button>
            <button
              onClick={ClickHandler(navigate, "/tic-tac-toe")}
              className={style.button}
            >
              Quiz
            </button>
            <button
              onClick={ClickHandler(navigate, "/tic-tac-toe")}
              className={style.button}
            >
              Sudoku
            </button>
          </div>
        </div>
      </main>
      <footer>
        <div className={style.movingCards}>{/* <MovingCards /> */}</div>
      </footer>
    </div>
  );
}
