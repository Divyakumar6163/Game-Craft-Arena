import React from "react";
// import styles from "./PlaybackControls.module.css";
import styles from "../RubiksCube.module.css";

import useAnimator from "../hooks/useAnimator";

const PlaybackControls = () => {
  const {
    first,

    previous,

    next,

    last,

    togglePlayPause,

    updateSpeed,

    speed,

    isPlaying,

    currentMoveNumber,

    totalMoves,

    canGoPrevious,

    canGoNext,

    canPlay,
  } = useAnimator();

  return (
    <div className={styles.playbackContainer}>
      {/* ================= Counter ================= */}

      <div className={styles.moveCounter}>
        <span className={styles.currentMove}>{currentMoveNumber}</span>

        <span className={styles.separator}>/</span>

        <span className={styles.totalMoves}>{totalMoves}</span>
      </div>

      {/* ================= Controls ================= */}

      <div className={styles.controlButtons}>
        <button
          type="button"
          className={styles.controlButton}
          onClick={first}
          disabled={!canGoPrevious}
          title="Go To Beginning"
        >
          ⏮
        </button>

        <button
          type="button"
          className={styles.controlButton}
          onClick={previous}
          disabled={!canGoPrevious}
          title="Previous Move"
        >
          ◀
        </button>

        <button
          type="button"
          className={`${styles.controlButton} ${styles.playButton}`}
          onClick={togglePlayPause}
          disabled={!canPlay}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>

        <button
          type="button"
          className={styles.controlButton}
          onClick={next}
          disabled={!canGoNext}
          title="Next Move"
        >
          ▶
        </button>

        <button
          type="button"
          className={styles.controlButton}
          onClick={last}
          disabled={!canGoNext}
          title="Go To End"
        >
          ⏭
        </button>
      </div>

      {/* ================= Speed ================= */}

      <div className={styles.speedControl}>
        <span className={styles.speedLabel}>Speed</span>

        <input
          type="range"
          min="0.25"
          max="3"
          step="0.25"
          value={speed}
          onChange={(e) => updateSpeed(Number(e.target.value))}
        />

        <span className={styles.speedValue}>{speed.toFixed(2)}×</span>
      </div>
    </div>
  );
};

export default React.memo(PlaybackControls);
