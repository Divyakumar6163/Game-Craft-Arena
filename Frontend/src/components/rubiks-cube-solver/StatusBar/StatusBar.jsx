import styles from "./StatusBar.module.css";

const StatusBar = () => {
  return (
    <div className={styles.status}>
      <div>
        <strong>State:</strong> Solved
      </div>

      <div>
        <strong>Algorithm:</strong> IDA*
      </div>

      <div>
        <strong>Moves:</strong> 0
      </div>

      <div>
        <strong>Time:</strong> --
      </div>
    </div>
  );
};

export default StatusBar;
