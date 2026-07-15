import React, { useEffect, useRef } from "react";
// import styles from "./MoveList.module.css";
import styles from "../RubiksCube.module.css";

import { CubeSolver } from "../solver/solver";
import { useCube } from "../context/CubeContext";
import useAnimator from "../hooks/useAnimator";

const MoveList = () => {
  const {
    solution,

    moveIndex,
  } = useCube();

  const { jumpToMove } = useAnimator();

  const activeMoveRef = useRef(null);

  useEffect(() => {
    activeMoveRef.current?.scrollIntoView({
      behavior: "smooth",

      block: "nearest",
    });
  }, [moveIndex]);

  if (!solution.length) {
    return (
      <div className={styles.emptyMoveList}>
        <h3>No Solution</h3>

        <p>Solve the cube first to see the move sequence.</p>
      </div>
    );
  }

  return (
    <div className={styles.moveList}>
      {solution.map((move, index) => {
        const active = index === moveIndex;

        const completed = index < moveIndex;

        return (
          <button
            key={index}
            ref={active ? activeMoveRef : null}
            type="button"
            onClick={() => jumpToMove(index)}
            className={`
                            ${styles.moveItem}
                            ${active ? styles.activeMove : ""}
                            ${completed ? styles.completedMove : ""}
                        `}
          >
            <span className={styles.moveNumber}>
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className={styles.moveNotation}>{move}</span>

            <span className={styles.moveDescription}>
              {CubeSolver.getMoveDescription(move)}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default React.memo(MoveList);
