import React, { useMemo } from "react";
// import styles from "./VerifyPhase.module.css";
import styles from "../RubiksCube.module.css";

import CubeNet from "./CubeNet";

import { useCube } from "../context/CubeContext";
import useSolver from "../hooks/useSolver";

import { FACE_COLORS } from "../solver/cube-state";

const PALETTE = [
  { key: "U", label: "White" },
  { key: "R", label: "Red" },
  { key: "F", label: "Green" },
  { key: "D", label: "Yellow" },
  { key: "L", label: "Orange" },
  { key: "B", label: "Blue" },
];

const VerifyPhase = () => {
  const {
    cubeState,

    selectedPaletteColor,
    setSelectedPaletteColor,

    validation,
    setValidation,

    setCurrentPhase,
  } = useCube();

  const { solveCube } = useSolver();

  const validateCube = () => {
    const result = cubeState.current.validate();

    if (result.valid) {
      setValidation({
        valid: true,
        error: "✓ Cube state is valid! Ready to solve.",
      });
    } else {
      setValidation(result);
    }
  };

  const selectColor = (color) => {
    setSelectedPaletteColor(selectedPaletteColor === color ? null : color);
  };

  const back = () => {
    setCurrentPhase(1);
  };

  const solve = async () => {
    const result = cubeState.current.validate();
    console.log(result);
    setValidation(result);

    if (!result.valid) return;

    await solveCube();
  };

  const messageClass = useMemo(() => {
    if (!validation.error) return styles.emptyValidation;

    return validation.valid ? styles.successValidation : styles.errorValidation;
  }, [validation]);

  return (
    <section className={styles.phase}>
      {/* ================= LEFT ================= */}

      <div className={styles.verifyLeft}>
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Verify Cube</h2>

          <p className={styles.sectionSubtitle}>
            Click any sticker to edit it.
          </p>

          <CubeNet />
        </div>
      </div>

      {/* ================= RIGHT ================= */}

      <div className={styles.verifyRight}>
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Sticker Palette</h2>

          <div className={styles.palette}>
            {PALETTE.map((color) => (
              <button
                key={color.key}
                type="button"
                className={`
                                    ${styles.paletteColor}
                                    ${
                                      selectedPaletteColor === color.key
                                        ? styles.activePalette
                                        : ""
                                    }
                                `}
                style={{
                  background: FACE_COLORS[color.key],
                }}
                onClick={() => selectColor(color.key)}
                title={color.label}
              />
            ))}
          </div>
        </div>

        <div className={styles.card}>
          <button className={styles.primaryButton} onClick={validateCube}>
            Validate Cube
          </button>

          <div className={messageClass}>{validation.error}</div>
        </div>

        <div className={styles.card}>
          <div className={styles.verifyButtons}>
            <button className={styles.secondaryButton} onClick={back}>
              ← Back
            </button>

            <button
              className={styles.successButton}
              disabled={!validation.valid}
              onClick={solve}
            >
              Solve Cube
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyPhase;
