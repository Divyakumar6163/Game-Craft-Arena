import style from "./GameOver.module.css";
export default function GameOver({ winner, onReset }) {
  return (
    <div className={style.gameOver}>
      <h2>Game Over!</h2>
      {winner != null ? <p>{winner} Won!</p> : <p>It's a Draw</p>}
      <p>
        <button onClick={onReset}>Rematch!</button>
      </p>
    </div>
  );
}
