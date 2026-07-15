import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import { CubeState, SCAN_ORDER } from "../solver/cube-state";

import { CubeScanner } from "../solver/scanner";
import { CubeSolver } from "../solver/solver";
// import { SolutionAnimator } from "../../../solver/animator";

export const CubeContext = createContext(null);

export const CubeProvider = ({ children }) => {
  // ==========================================
  // Core Objects (Persist across renders)
  // ==========================================

  const cubeState = useRef(new CubeState());

  const scanner = useRef(new CubeScanner());

  const solver = useRef(new CubeSolver());

  const animator = useRef(null);

  const cube3d = useRef(null);

  // ==========================================
  // Application State
  // ==========================================

  const [currentPhase, setCurrentPhase] = useState(1);

  const [scanIndex, setScanIndex] = useState(0);

  const [selectedPaletteColor, setSelectedPaletteColor] = useState(null);

  const [detectedColors, setDetectedColors] = useState([]);

  const [cubeVersion, setCubeVersion] = useState(0);

  const [validation, setValidation] = useState({
    valid: false,
    error: "",
  });

  const [solution, setSolution] = useState([]);

  const [solveStatus, setSolveStatus] = useState("");

  const [solveProgress, setSolveProgress] = useState(0);

  const [moveIndex, setMoveIndex] = useState(-1);

  const [currentMove, setCurrentMove] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const [speed, setSpeed] = useState(1);

  // ==========================================
  // Camera Refs
  // ==========================================

  const webcamVideoRef = useRef(null);

  const scanOverlayRef = useRef(null);

  // ==========================================
  // Animation Refs
  // ==========================================

  const cubeContainerRef = useRef(null);

  const animationFrameRef = useRef(null);

  // ==========================================
  // Helper Functions
  // ==========================================

  const refreshCube = () => {
    setCubeVersion((v) => v + 1);
  };

  const resetCube = () => {
    cubeState.current = new CubeState();

    SCAN_ORDER.forEach((face) => {
      cubeState.current.setSticker(face, 4, face);
    });

    refreshCube();

    setScanIndex(0);

    setSolution([]);

    setMoveIndex(-1);

    setCurrentMove(null);

    setValidation({
      valid: false,
      error: "",
    });

    setCurrentPhase(1);
  };

  // ==========================================
  // Context Value
  // ==========================================

  const value = useMemo(
    () => ({
      cubeState,
      scanner,
      solver,
      animator,
      cube3d,

      currentPhase,
      setCurrentPhase,

      scanIndex,
      setScanIndex,

      selectedPaletteColor,
      setSelectedPaletteColor,

      detectedColors,
      setDetectedColors,

      cubeVersion,
      refreshCube,

      validation,
      setValidation,

      solution,
      setSolution,

      solveStatus,
      setSolveStatus,

      solveProgress,
      setSolveProgress,

      moveIndex,
      setMoveIndex,

      currentMove,
      setCurrentMove,

      isPlaying,
      setIsPlaying,

      speed,
      setSpeed,

      webcamVideoRef,
      scanOverlayRef,

      cubeContainerRef,
      animationFrameRef,

      resetCube,
    }),
    [
      currentPhase,
      scanIndex,
      selectedPaletteColor,
      detectedColors,
      cubeVersion,
      validation,
      solution,
      solveStatus,
      solveProgress,
      moveIndex,
      currentMove,
      isPlaying,
      speed,
    ],
  );

  return <CubeContext.Provider value={value}>{children}</CubeContext.Provider>;
};

export const useCube = () => {
  const context = useContext(CubeContext);

  if (!context) {
    throw new Error("useCube must be used inside CubeProvider.");
  }

  return context;
};
