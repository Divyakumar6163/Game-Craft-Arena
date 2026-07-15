import React, { useEffect } from "react";
// import styles from "./AnimatePhase.module.css";
import styles from "../RubiksCube.module.css";

import MoveList from "./MoveList";
import PlaybackControls from "./PlaybackControls";

import { Cube3D } from "../solver/cube3d";
import { CubeSolver } from "../solver/solver";

import { useCube } from "../context/CubeContext";

const AnimatePhase = () => {
  console.log("Animate Phase Rendered");
  const {
    cubeContainerRef,

    cube3d,

    cubeState,

    currentMove,

    setCurrentPhase,

    isPlaying,
  } = useCube();

  useEffect(() => {
    if (!cubeContainerRef.current) return;

    cube3d.current?.dispose();

    cube3d.current = new Cube3D(cubeContainerRef.current);

    cube3d.current.setState(cubeState.current.toFaceletString());

    return () => {
      cube3d.current?.dispose();
    };
  }, [cubeState]);

  const startNewSolve = () => {
    setCurrentPhase(1);
  };

  return (
    <section className={styles.phase}>
      <div className={styles.animateLeft}>
        <div ref={cubeContainerRef} className={styles.cube3DContainer} />

        <PlaybackControls />
      </div>

      <div className={styles.animateRight}>
        <div className={styles.currentMoveCard}>
          <div className={styles.currentMoveTitle}>Current Move</div>

          <div className={styles.currentMoveNotation}>{currentMove || "-"}</div>

          <div className={styles.currentMoveDescription}>
            {currentMove
              ? CubeSolver.getMoveDescription(currentMove)
              : "Ready to play solution"}
          </div>
        </div>

        <MoveList />

        <button
          className={styles.primaryButton}
          disabled={isPlaying}
          onClick={startNewSolve}
        >
          Solve Another Cube
        </button>
      </div>
    </section>
  );
};

export default AnimatePhase;
