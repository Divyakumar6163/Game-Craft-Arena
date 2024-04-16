import style from "./restartModal.module.css";
import { useNavigate } from "react-router-dom";
export default function RestartModal({ setRestartModal, isRobot }) {
  const Navigate = useNavigate();
  function handleClose() {
    setRestartModal(false);
  }
  function handleRestart() {
    if (!isRobot) Navigate("/player1");
    else Navigate("/levels");
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
