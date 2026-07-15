import Sticker from "./Sticker";

const DEFAULT_COLOR = "#151515";

const Cubie = ({ cubie }) => {
  const { position, colors } = cubie;

  return (
    <group
      position={[position[0] * 1.05, position[1] * 1.05, position[2] * 1.05]}
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
