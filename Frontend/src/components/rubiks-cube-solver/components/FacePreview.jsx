import React from "react";
// import styles from "./FacePreview.module.css";
import styles from "../RubiksCube.module.css";

import { FACE_COLORS } from "../solver/cube-state";

const FacePreview = ({ face, colors, scanned }) => {
  return (
    <div className={`${styles.facePreview} ${scanned ? styles.scanned : ""}`}>
      <div className={styles.previewTitle}>{face}</div>

      <div className={styles.previewGridFace}>
        {colors.map((color, index) => (
          <div
            key={index}
            className={styles.miniSticker}
            style={{
              backgroundColor: color ? FACE_COLORS[color] : "#474C59",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FacePreview;
