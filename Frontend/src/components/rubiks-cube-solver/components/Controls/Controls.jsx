import styles from "./Controls.module.css";
import ScrambleController from "../../algorithms/controllers/ScrambleController";
import { resetCube } from "../../store/cubeActions";
import { animateMove } from "../../store/animationActions";
const Controls = () => {
  return (
    <div className={styles.controls}>
      <button onClick={() => animateMove("R")}>R</button>

      <button onClick={() => animateMove("R'")}>R'</button>

      <button onClick={() => animateMove("U")}>U</button>

      <button onClick={() => animateMove("F")}>F</button>

      <button onClick={resetCube}>Reset</button>
      <button onClick={() => ScrambleController.scramble()}>Scramble</button>
    </div>
  );
};

export default Controls;
