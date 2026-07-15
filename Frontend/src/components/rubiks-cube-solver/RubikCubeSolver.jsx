import { useEffect } from "react";
import { testSolver } from "./tests/testSolver";
import styles from "./RubikCubeSolver.module.css";
import CubeContainer from "./components/Cube3D/CubeContainer";
import SolutionPanel from "./components/SolutionPanel/SolutionPanel";

import Statistics from "./components/Statistics/Statistics";

import useSolverStore from "./store/solverStore";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import useKeyboardControls from "./hooks/useKeyboardControls";
const RubikCubeSolver = () => {
  useKeyboardControls();
  const {
    solution,

    metrics,
  } = useSolverStore();
  // useEffect(() => {
  //   testSolver();
  // }, []);
  return (
    <div>
      <h1 className={styles.title}>Rubik's Cube Solver</h1>

      <div className={styles.container}>
        <ControlPanel />
        <CubeContainer />
      </div>
      <SolutionPanel />
      <Statistics metrics={metrics} />
    </div>
  );
};

export default RubikCubeSolver;
