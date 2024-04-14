import style from "./playingOption.module.css";
import { useNavigate } from "react-router-dom";
export default function PlayingOption({ checkOption }) {
  const navigate = useNavigate();
  function handleClick1() {
    checkOption(true);
    navigate("/levels");
  }
  function handleClick2() {
    checkOption(false);
    navigate("/levels");
  }
  function handleBack() {
    navigate("/");
  }
  return (
    <div className={style.playingOption}>
      <button className={style.backButton} onClick={handleBack}>
        Back
      </button>
      <div className={style.innerContainer}>
        <h1 className={style.h1}>Playing Options</h1>
        <button className={style.button} onClick={handleClick1}>
          Single Player
        </button>
        <button className={style.button} onClick={handleClick2}>
          Multi Player
        </button>
      </div>
    </div>
  );
}
