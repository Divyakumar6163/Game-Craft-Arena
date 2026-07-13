import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const RotationGroup = ({ children, axis = "x", angle = 0 }) => {
  const group = useRef();

  useFrame(() => {
    if (!group.current) return;

    group.current.rotation[axis] = THREE.MathUtils.degToRad(angle);
  });

  return <group ref={group}>{children}</group>;
};

export default RotationGroup;
