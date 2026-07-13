const Sticker = ({ position, rotation, color }) => {
  return (
    <mesh position={position} rotation={rotation}>
      {/* Very thin rectangle */}
      <boxGeometry args={[0.72, 0.72, 0.04]} />

      <meshStandardMaterial color={color} metalness={0.15} roughness={0.4} />
    </mesh>
  );
};

export default Sticker;
