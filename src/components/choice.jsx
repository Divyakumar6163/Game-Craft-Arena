import style from "./choice.module.css";
import { useNavigate } from "react-router-dom";
export default function Choice({ playingChoiceImg }) {
  const navigate = useNavigate();
  function handleClick1() {
    playingChoiceImg(false);
    navigate("/levels");
  }
  function handleClick2() {
    playingChoiceImg(true);
    navigate("/levels");
  }
  function handleBack() {
    navigate("/playingOption");
  }
  return (
    <div className={style.choiceOption}>
      <button className={style.backButton} onClick={handleBack}>
        Back
      </button>
      <div className={style.innerContainer}>
        <h1 className={style.h1}>Choose Your Game</h1>
        <button className={style.button} onClick={handleClick1}>
          Guess By Description
        </button>
        <button className={style.button} onClick={handleClick2}>
          Guess by Image
        </button>
      </div>
    </div>
  );
}
