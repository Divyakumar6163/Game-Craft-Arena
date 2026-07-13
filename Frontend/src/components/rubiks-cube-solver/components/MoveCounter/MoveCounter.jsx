import useHistoryStore from "../../store/historyStore";
import styles from "./MoveCounter.module.css";

const MoveCounter = () => {
  const moves = useHistoryStore((state) => state.moves);

  return <div className={styles.counter}>Moves : {moves.length}</div>;
};

export default MoveCounter;
