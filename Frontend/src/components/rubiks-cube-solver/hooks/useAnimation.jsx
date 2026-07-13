import { useState } from "react";

export default function useAnimation() {
  const [angle, setAngle] = useState(0);

  const [running, setRunning] = useState(false);

  return {
    angle,

    setAngle,

    running,

    setRunning,
  };
}
