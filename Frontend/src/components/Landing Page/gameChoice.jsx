import style from "./gameChoice.module.css";
import { useNavigate } from "react-router-dom";
import ClickHandler from "./ClickHandler";
import MovingCards from "./movingCards";
const games = [
  { name: "Guess The Object", link: "/guess-the-object" },
  { name: "Tic Tac Toe", link: "/tic-tac-toe" },
  { name: "Quiz", link: "/quiz" },
  { name: "Sudoku", link: "/sudoku" },
];
export default function GameChoice() {
  const navigate = useNavigate();
  return (
    <div className={style.mainArea}>
      <header>
        <h1 className={style.h1}>Game Craft Arena</h1>
      </header>
      <main className={style.main}>
        <div className={style.buttonContainer}>
          <h1 className={style.title}>Choose Your Game</h1>
          <div className={style.container}>
            {games.map((data, index) => {
              return (
                <button
                  key={index}
                  onClick={ClickHandler(navigate, data.link)}
                  className={style.button}
                >
                  {data.name}
                </button>
              );
            })}
          </div>
        </div>
      </main>
      <footer>
        <div className={style.movingCards}>
          <MovingCards />
        </div>
      </footer>
    </div>
  );
}
