import useMoveQueueStore from "../../store/moveQueueStore";

import styles from "./QueueViewer.module.css";

const QueueViewer = () => {
  const queue = useMoveQueueStore((state) => state.queue);

  return (
    <div className={styles.viewer}>
      <h3>Queue</h3>

      <div>{queue.join(" ")}</div>
    </div>
  );
};

export default QueueViewer;
