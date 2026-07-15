import React, { useEffect } from "react";
// import styles from "./SolvePhase.module.css";
import styles from "../RubiksCube.module.css";

import { useCube } from "../context/CubeContext";
import useSolver from "../hooks/useSolver";
const SolvePhase = () => {
  const {
    solveStatus,

    solveProgress,

    solution,

    currentPhase,
  } = useCube();

  const { solveCube } = useSolver();

  useEffect(() => {
    if (currentPhase !== 3) return;

    solveCube();
  }, [currentPhase]);

  const solved = solution.length > 0;

  return (
    <section className={styles.phase}>
      <div className={styles.solveContainer}>
        <div className={styles.card}>
          <h1>Solving Cube</h1>

          <p className={styles.solveStatus}>{solveStatus}</p>

          <div className={styles.progressWrapper}>
            <div
              className={styles.progressBar}
              style={{
                width: `${solveProgress}%`,
              }}
            />
          </div>

          <div className={styles.progressText}>
            {Math.round(solveProgress)}%
          </div>
        </div>

        {solved && (
          <div className={styles.solutionBox}>
            <h2>Solution Found</h2>

            <div className={styles.solutionMoves}>
              {solution.map((move, index) => (
                <div key={index} className={styles.solutionMove}>
                  {move}
                </div>
              ))}
            </div>

            <div className={styles.moveCount}>{solution.length} Moves</div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SolvePhase;
