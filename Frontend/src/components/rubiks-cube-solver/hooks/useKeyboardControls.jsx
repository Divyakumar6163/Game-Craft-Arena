import { useEffect } from "react";
import CubeController from "../algorithms/controllers/CubeController";

const KEY_MAP = {
  r: "R",
  R: "R'",

  l: "L",
  L: "L'",

  u: "U",
  U: "U'",

  d: "D",
  D: "D'",

  f: "F",
  F: "F'",

  b: "B",
  B: "B'",
};

export default function useKeyboardControls() {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const move = KEY_MAP[event.key];

      if (!move) return;

      event.preventDefault();

      CubeController.move(move);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}
