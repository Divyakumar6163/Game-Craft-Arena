import styles from "./SolutionPanel.module.css";
import useSolverStore from "../../store/solverStore";

const SolutionPanel = () => {
  const solution = useSolverStore((state) => state.solution);
  const currentMove = useSolverStore((state) => state.currentMove);

  return (
    <div className={styles.panel}>
      <h2>Solution</h2>

      <div className={styles.moves}>
        {solution.length === 0 ? (
          <p>No solution yet.</p>
        ) : (
          solution.map((move, index) => (
            <span
              key={index}
              className={index === currentMove ? styles.active : ""}
            >
              {move}
            </span>
          ))
        )}
      </div>
    </div>
  );
};

export default SolutionPanel;
