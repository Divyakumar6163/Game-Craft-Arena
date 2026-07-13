import { useRef } from "react";
import CubeEngine from "../algorithms/engine/CubeEngine";

export default function useCubeEngine() {
  const engineRef = useRef();

  if (!engineRef.current) {
    engineRef.current = new CubeEngine();
  }

  return engineRef.current;
}
