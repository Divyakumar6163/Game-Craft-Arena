import styles from "./CubeContainer.module.css";
import Cube3D from "./Cube3D";

const CubeContainer = () => {
  return (
    <div className={styles.container}>
      <Cube3D />
    </div>
  );
};

export default CubeContainer;
