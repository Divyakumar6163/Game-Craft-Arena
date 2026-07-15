import { useCallback } from "react";
import { useCube } from "../context/CubeContext";
import SolutionAnimator from "../solver/animator";
const useSolver = () => {
  console.log("useSolver");
  const {
    cubeState,
    solver,

    setCurrentPhase,

    setSolveStatus,
    setSolveProgress,

    setSolution,

    cube3d,
    animator,

    setMoveIndex,
    setCurrentMove,
    setIsPlaying,
  } = useCube();

  // =====================================================
  // Initialize Solver
  // =====================================================

  const initializeSolver = useCallback(async () => {
    setSolveStatus("Initializing Solver...");
    setSolveProgress(0);

    await solver.current.initialize((progress) => {
      setSolveProgress(progress * 0.7);
    });

    setSolveProgress(70);
  }, []);

  // =====================================================
  // Solve Cube
  // =====================================================

  const solveCube = useCallback(async () => {
    try {
      await initializeSolver();
      console.log("Initialized");
      setSolveStatus("Preparing Cube...");
      setSolveProgress(75);

      const faceletString = cubeState.current.toFaceletString();
      console.log(faceletString);
      setSolveStatus("Searching Solution...");
      setSolveProgress(80);

      const result = await solver.current.solve(faceletString);
      console.log(result);
      if (!result.success) {
        throw new Error(result.error);
      }

      setSolveProgress(100);

      setSolveStatus(`Solved in ${result.moveCount} moves`);

      setSolution(result.moves);

      setTimeout(() => {
        prepareAnimation(result.moves, faceletString);
      }, 1200);

      return result;
    } catch (err) {
      setSolveProgress(0);

      setSolveStatus(err.message || "Failed to solve cube.");

      return null;
    }
  }, []);

  // =====================================================
  // Prepare Animation
  // =====================================================

  const prepareAnimation = useCallback((moves, initialState) => {
    console.log("prepareAnimation()");
    // Go to animation page first.
    setCurrentPhase(4);

    // Give React time to render AnimatePhase
    setTimeout(() => {
      if (!cube3d.current) {
        console.error("Cube3D not initialized");
        return;
      }

      cube3d.current.setState(initialState);
      animator.current = new SolutionAnimator(cube3d.current);
      console.log(animator.current);
      animator.current.setMoves(moves, initialState);
      setMoveIndex(-1);
      setCurrentMove(null);
      setIsPlaying(false);
      console.log("Moves set:", moves.length);
      console.log(animator.current);
      animator.current.onUpdate((currentIndex, total, move, playing) => {
        setMoveIndex(currentIndex);

        setCurrentMove(move);

        setIsPlaying(playing);

        console.log({
          currentIndex,
          total,
          move,
          playing,
        });
      });
    }, 100);
  }, []);

  // =====================================================
  // Restart Solver
  // =====================================================

  const resetSolver = () => {
    setSolveProgress(0);

    setSolveStatus("");

    setSolution([]);

    setMoveIndex(-1);

    setCurrentMove(null);

    setIsPlaying(false);
  };

  return {
    initializeSolver,
    solveCube,
    prepareAnimation,
    resetSolver,
  };
};

export default useSolver;
