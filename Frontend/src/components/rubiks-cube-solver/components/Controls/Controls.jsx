import styles from "./Controls.module.css";
import ScrambleController from "../../algorithms/controllers/ScrambleController";
import { resetCube } from "../../store/cubeActions";
import { animateMove } from "../../store/animationActions";
import useAnimationStore from "../../store/animationStore";
const Controls = () => {
  const isAnimating = useAnimationStore((state) => state.isAnimating);
  return (
    <div className={styles.controls}>
      <button disabled={isAnimating} onClick={() => animateMove("R")}>
        R
      </button>

      <button disabled={isAnimating} onClick={() => animateMove("R'")}>
        R'
      </button>

      <button disabled={isAnimating} onClick={() => animateMove("U")}>
        U
      </button>

      <button disabled={isAnimating} onClick={() => animateMove("F")}>
        F
      </button>

      <button onClick={resetCube}>Reset</button>
      <button onClick={() => ScrambleController.scramble()}>Scramble</button>
    </div>
  );
};

export default Controls;
