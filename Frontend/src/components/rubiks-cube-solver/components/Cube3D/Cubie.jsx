import { useMemo } from "react";
import Sticker from "./Sticker";
import useAnimationStore from "../../store/animationStore";

const DEFAULT_COLOR = "#151515";

const Cubie = ({ cubie }) => {
  const { position, colors } = cubie;

  const { isAnimating, axis, layer, angle, clockwise } = useAnimationStore();

  const belongsToLayer = useMemo(() => {
    switch (axis) {
      case "x":
        return position[0] === layer;

      case "y":
        return position[1] === layer;

      case "z":
        return position[2] === layer;

      default:
        return false;
    }
  }, [axis, layer, position]);

  const rotation = [0, 0, 0];

  if (isAnimating && belongsToLayer) {
    const rad = (angle * Math.PI) / 180;
    const value = clockwise ? rad : -rad;

    switch (axis) {
      case "x":
        rotation[0] = value;
        break;

      case "y":
        rotation[1] = value;
        break;

      case "z":
        rotation[2] = value;
        break;

      default:
        break;
    }
  }

  return (
    <group
      position={[position[0] * 1.05, position[1] * 1.05, position[2] * 1.05]}
      rotation={rotation}
    >
      {/* Black Plastic */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.95, 0.95, 0.95]} />
        <meshStandardMaterial color={DEFAULT_COLOR} />
      </mesh>

      {/* Top */}
      {colors.yPositive && (
        <Sticker
          color={colors.yPositive}
          position={[0, 0.48, 0]}
          rotation={[0, 0, 0]}
        />
      )}

      {/* Bottom */}
      {colors.yNegative && (
        <Sticker
          color={colors.yNegative}
          position={[0, -0.48, 0]}
          rotation={[Math.PI, 0, 0]}
        />
      )}

      {/* Right */}
      {colors.xPositive && (
        <Sticker
          color={colors.xPositive}
          position={[0.48, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
        />
      )}

      {/* Left */}
      {colors.xNegative && (
        <Sticker
          color={colors.xNegative}
          position={[-0.48, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        />
      )}

      {/* Front */}
      {colors.zPositive && (
        <Sticker
          color={colors.zPositive}
          position={[0, 0, 0.48]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      )}

      {/* Back */}
      {colors.zNegative && (
        <Sticker
          color={colors.zNegative}
          position={[0, 0, -0.48]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      )}
    </group>
  );
};

export default Cubie;
