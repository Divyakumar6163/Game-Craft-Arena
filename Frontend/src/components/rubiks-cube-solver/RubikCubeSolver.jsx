import styles from "./RubikCubeSolver.module.css";
import CubeContainer from "./components/Cube3D/CubeContainer";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import useKeyboardControls from "./hooks/useKeyboardControls";
const RubikCubeSolver = () => {
  useKeyboardControls();
  return (
    <div>
      <h1 className={styles.title}>Rubik's Cube Solver</h1>

      <div className={styles.container}>
        <ControlPanel />
        <CubeContainer />
      </div>
    </div>
  );
};

export default RubikCubeSolver;
