import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import useCubeStore from "../../store/cubeStore";
import RotatingLayer from "./RotatingLayer";
import StaticLayer from "./StaticLayer";
// import useCubeEngine from "../../hooks/useCubeEngine";

const Cube3D = () => {
  // const engine = useCubeEngine();
  // const cube = engine.getState();
  const cube = useCubeStore((state) => state.cubies);
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 35 }} shadows>
      {/* Background */}
      <color attach="background" args={["#111111"]} />

      {/* Lights */}
      <ambientLight intensity={1.5} />

      <directionalLight position={[6, 6, 6]} intensity={2} />

      <directionalLight position={[-6, -6, -6]} intensity={1} />

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={4}
        maxDistance={10}
        target={[0, 0, 0]}
      />
      <StaticLayer cubies={cube} />

      <RotatingLayer cubies={cube} />
    </Canvas>
  );
};

export default Cube3D;
