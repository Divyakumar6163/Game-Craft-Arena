import React from "react";
// import styles from "./CubeNet.module.css";
import styles from "../RubiksCube.module.css";
import { ALL_FACES, FACE_COLORS } from "../solver/cube-state";

import { useCube } from "../context/CubeContext";

const COLOR_ORDER = ["U", "R", "F", "D", "L", "B"];

const CubeNet = () => {
  const {
    cubeState,

    selectedPaletteColor,

    refreshCube,

    setValidation,
  } = useCube();

  const onStickerClick = (face, index) => {
    if (index === 4) return;

    if (selectedPaletteColor) {
      cubeState.current.setSticker(face, index, selectedPaletteColor);
    } else {
      const current = cubeState.current.getSticker(face, index);

      const currentIndex = COLOR_ORDER.indexOf(current);

      const next = COLOR_ORDER[(currentIndex + 1) % COLOR_ORDER.length];

      cubeState.current.setSticker(face, index, next);
    }

    refreshCube();

    setValidation({
      valid: false,

      error: "",
    });
  };

  return (
    <div className={styles.cubeNet}>
      {ALL_FACES.map((face) => (
        <div key={face} className={styles.faceContainer} data-face={face}>
          <div className={styles.faceTitle}>{face}</div>

          <div className={styles.faceGrid}>
            {cubeState.current.getFace(face).map((color, index) => (
              <div key={index} className={styles.stickerWrapper}>
                <button
                  type="button"
                  disabled={index === 4}
                  className={`
                                            ${styles.netSticker}
                                            ${
                                              index === 4
                                                ? styles.centerSticker
                                                : ""
                                            }
                                        `}
                  style={{
                    background: color ? FACE_COLORS[color] : "#3d3d3d",
                  }}
                  onClick={() => onStickerClick(face, index)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CubeNet;
