import { useEffect } from "react";

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

  return (
    <div>
      {!timer && <button onClick={handleTimer}>Start Timer</button>}
      {timer > 0 && <p>{displayTime}</p>}
    </div>
  );
}

export default TimerComponent;
