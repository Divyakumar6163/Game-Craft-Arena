import styles from "./ControlPanel.module.css";
import History from "../History/History";
import Controls from "../Controls/Controls";
import SolverStats from "../SolverStats/SolverStats";
import SolverController from "../../algorithms/controllers/SolverController";
import useSolverStore from "../../store/solverStore";

const ControlPanel = () => {
  const algorithm = useSolverStore((state) => state.algorithm);
  const setAlgorithm = useSolverStore((state) => state.setAlgorithm);
  return (
    <div className={styles.panel}>
      <h2>Control Panel</h2>

      <section className={styles.section}>
        <h3>Basic Moves</h3>
        <Controls />
      </section>

      <section className={styles.section}>
        <h3>Solver</h3>

        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          <option value="BFS">BFS</option>

          <option value="BIDIRECTIONAL">Bidirectional BFS</option>

          <option value="ASTAR">A*</option>

          {/* <option value="IDASTAR">IDA*</option> */}
        </select>
        <button onClick={() => SolverController.solve(algorithm)}>Solve</button>
      </section>
      <section className={styles.section}>
        <History />
      </section>
      <section className={styles.section}>
        <SolverStats />
      </section>
      <section className={styles.section}>
        <h3>Animation Speed</h3>

        <input type="range" min="1" max="10" defaultValue="5" />
      </section>

      <section className={styles.section}>
        <h3>Image Detection</h3>

        <button disabled>Upload Face (Coming Soon)</button>
      </section>
    </div>
  );
};

export default ControlPanel;
