import useSolverStore from "../../store/solverStore";
import styles from "./SolverStats.module.css";

const SolverStats = () => {
  const { algorithm, solveTime, expandedNodes, solution } = useSolverStore();

  return (
    <div className={styles.stats}>
      <h3>Solver Statistics</h3>

      <p>
        <strong>Algorithm:</strong> {algorithm}
      </p>

      <p>
        <strong>Time:</strong> {solveTime} ms
      </p>

      <p>
        <strong>Expanded Nodes:</strong> {expandedNodes}
      </p>

      <p>
        <strong>Solution Length:</strong> {solution.length}
      </p>
    </div>
  );
};

export default SolverStats;
