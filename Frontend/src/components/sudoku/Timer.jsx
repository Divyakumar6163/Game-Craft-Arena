import { useEffect } from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import styles from "./Timer.module.css";
function TimerComponent({ timer, setTimer, isPlay, setIsPlay }) {
  function handleTimer() {
    setIsPlay(true);
  }
  useEffect(() => {
    let interval;
    if (isPlay) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlay, setTimer]);
  const hours = Math.floor(timer / 3600);
  const minutes = Math.floor((timer % 3600) / 60);
  const seconds = timer % 60;

  let displayTime = "";
  if (hours > 0) {
    displayTime = `${hours}hr ${minutes}min ${seconds}sec`;
  } else if (minutes > 0) {
    displayTime = `${minutes}min ${seconds}sec`;
  } else {
    displayTime = `${seconds}sec`;
  }
  function handlePause() {
    setIsPlay((prev) => !prev);
  }
  return (
    <div className={styles.timerDiv}>
      {timer > 0 && isPlay && <FaPauseCircle onClick={handlePause} />}
      {timer > 0 && !isPlay && <FaPlayCircle onClick={handlePause} />}
      {!timer && (
        <button onClick={handleTimer} className={styles.timerButton}>
          Start Timer
        </button>
      )}
      {timer > 0 && <p className={styles.pTimer}>{displayTime}</p>}
    </div>
  );
}

export default TimerComponent;
