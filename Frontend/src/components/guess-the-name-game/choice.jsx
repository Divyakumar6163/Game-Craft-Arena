import style from "./choice.module.css";
import { useNavigate } from "react-router-dom";
import Header from "./header";
export default function Choice({ playingChoiceImg }) {
  const navigate = useNavigate();
  function handleClick1() {
    playingChoiceImg(false);
    navigate("/guess-the-object/levels");
  }
  function handleClick2() {
    playingChoiceImg(true);
    navigate("/guess-the-object/levels");
  }
  function handleBack() {
    navigate("/guess-the-object/playingOption");
  }
  return (
    <>
      <Header />
      <div className={style.choiceOption}>
        <button className={style.backButton} onClick={handleBack}>
          Back
        </button>
        <div className={style.innerContainer}>
          <h1 className={style.h1}>Choose Your Type</h1>
          <button className={style.button} onClick={handleClick1}>
            Guess By Description
          </button>
          <button className={style.button} onClick={handleClick2}>
            Guess by Image
          </button>
        </div>
      </div>
    </>
  );
}
