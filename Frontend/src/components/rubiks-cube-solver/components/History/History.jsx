import useHistoryStore from "../../store/historyStore";
import styles from "./History.module.css";

const History = () => {
  const moves = useHistoryStore((state) => state.moves);

  return (
    <div className={styles.history}>
      <h3>Move History</h3>

      <div className={styles.list}>
        {moves.length === 0
          ? "No moves"
          : moves.map((move, index) => <span key={index}>{move}</span>)}
      </div>
    </div>
  );
};

export default History;
