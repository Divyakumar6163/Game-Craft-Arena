import { useMemo } from "react";
import Cubie from "./Cubie";
import useAnimationStore from "../../store/animationStore";

const StaticLayer = ({ cubies }) => {
  const { isAnimating, axis, layer } = useAnimationStore();

  const staticCubies = useMemo(() => {
    if (!isAnimating) return cubies;

    return cubies.filter((cubie) => {
      switch (axis) {
        case "x":
          return cubie.position[0] !== layer;

        case "y":
          return cubie.position[1] !== layer;

        case "z":
          return cubie.position[2] !== layer;

        default:
          return true;
      }
    });
  }, [cubies, isAnimating, axis, layer]);

  return (
    <>
      {staticCubies.map((cubie) => (
        <Cubie key={cubie.id} cubie={cubie} />
      ))}
    </>
  );
};

export default StaticLayer;
