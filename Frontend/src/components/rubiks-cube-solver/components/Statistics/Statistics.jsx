import styles from "./Statistics.module.css";

const Statistics = ({ metrics }) => {
  if (!metrics) {
    return null;
  }

  return (
    <div className={styles.panel}>
      <h2>Statistics</h2>

      <p>Expanded :{metrics.expandedNodes}</p>

      <p>Generated :{metrics.generatedNodes}</p>

      <p>
        Time :{metrics.executionTime.toFixed(2)}
        ms
      </p>

      <p>Depth :{metrics.maxDepth}</p>
    </div>
  );
};

export default Statistics;
