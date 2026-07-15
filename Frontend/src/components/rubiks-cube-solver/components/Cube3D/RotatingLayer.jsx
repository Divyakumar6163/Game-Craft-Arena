import { Group } from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import useAnimationStore from "../../store/animationStore";
import Cubie from "./Cubie";

const RotatingLayer = ({ cubies }) => {
  const groupRef = useRef();

  const { isAnimating, axis, layer, angle, clockwise } = useAnimationStore();

  const rotatingCubies = useMemo(() => {
    if (!isAnimating) return [];

    return cubies.filter((cubie) => {
      switch (axis) {
        case "x":
          return cubie.position[0] === layer;

        case "y":
          return cubie.position[1] === layer;

        case "z":
          return cubie.position[2] === layer;

        default:
          return false;
      }
    });
  }, [cubies, isAnimating, axis, layer]);

  useFrame(() => {
    if (!groupRef.current) return;

    groupRef.current.rotation.set(0, 0, 0);

    const value = ((clockwise ? angle : -angle) * Math.PI) / 180;

    switch (axis) {
      case "x":
        groupRef.current.rotation.x = value;
        break;

      case "y":
        groupRef.current.rotation.y = value;
        break;

      case "z":
        groupRef.current.rotation.z = value;
        break;

      default:
        break;
    }
  });

  return (
    <group ref={groupRef}>
      {rotatingCubies.map((cubie) => (
        <Cubie key={cubie.id} cubie={cubie} />
      ))}
    </group>
  );
};

export default RotatingLayer;
