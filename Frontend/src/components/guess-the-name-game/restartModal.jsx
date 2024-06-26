import style from "./restartModal.module.css";
import { useNavigate } from "react-router-dom";
export default function RestartModal({
  setRestartModal,
  isRobot,
  resethandler,
}) {
  const Navigate = useNavigate();
  function handleClose() {
    setRestartModal(false);
  }
  function handleRestart() {
    if (!isRobot) Navigate("/guess-the-object/player1");
    else {
      resethandler();
      setRestartModal(false);
      Navigate("/guess-the-object/player2");
    }
  }
  return (
    <dialog open className={style.modal}>
      <h1 className={style.h1}>Are you sure to Restart the Game?</h1>
      <button className={style.button} onClick={handleClose}>
        No
      </button>
      <button className={style.button} onClick={handleRestart}>
        Yes
      </button>
    </dialog>
  );
}
