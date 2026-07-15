import React, { useEffect } from "react";
// import styles from "./ScanPhase.module.css";
import styles from "../RubiksCube.module.css";

import FacePreview from "./FacePreview";

import useScanner from "../hooks/useScanner";
import { useCube } from "../context/CubeContext";

const FACE_ORDER = ["F", "R", "B", "L", "U", "D"];

const ScanPhase = () => {
  const {
    cubeState,

    scanner,

    webcamVideoRef,

    scanOverlayRef,

    detectedColors,

    scanIndex,

    currentPhase,

    setCurrentPhase,
  } = useCube();

  const {
    startScanning,

    stopScanning,

    captureFace,

    currentFaceName,

    currentFaceColor,
  } = useScanner();

  useEffect(() => {
    if (currentPhase !== 1) return;

    startScanning();

    return () => {
      stopScanning();
    };
  }, [currentPhase]);

  const handleCapture = () => {
    captureFace(detectedColors);
  };

  const mirrorCamera = (e) => {
    const checked = e.target.checked;

    scanner.current.isMirrored = checked;

    if (webcamVideoRef.current) {
      webcamVideoRef.current.style.transform = checked
        ? "scaleX(-1)"
        : "scaleX(1)";
    }
  };

  const goToVerify = () => {
    stopScanning();

    setCurrentPhase(2);
  };

  const scanCompleted = scanIndex >= 6;

  return (
    <section className={styles.phase}>
      {/* ================= LEFT ================= */}

      <div className={styles.scanLeft}>
        <div className={styles.card}>
          <div className={styles.webcamContainer}>
            <video
              ref={webcamVideoRef}
              autoPlay
              playsInline
              muted
              className={styles.video}
            />

            <canvas ref={scanOverlayRef} className={styles.overlay} />
          </div>

          <div className={styles.mirrorContainer}>
            <input
              id="mirror-camera"
              type="checkbox"
              defaultChecked
              onChange={mirrorCamera}
            />

            <label htmlFor="mirror-camera">Mirror Camera</label>
          </div>

          <div className={styles.scanControls}>
            <div className={styles.faceIndicator}>
              <span
                className={styles.faceDot}
                style={{
                  background: currentFaceColor,
                }}
              />

              <div>
                <h3>{currentFaceName}</h3>

                <small>Face</small>
              </div>
            </div>

            <p className={styles.scanInstruction}>
              {scanCompleted
                ? "All six faces captured successfully."
                : `Point the ${currentFaceName} face towards the camera and press Capture.`}
            </p>

            <div className={styles.buttonGroup}>
              <button
                className={styles.primaryButton}
                disabled={scanCompleted}
                onClick={handleCapture}
              >
                Capture Face
              </button>

              <button className={styles.secondaryButton} onClick={goToVerify}>
                Manual Entry
              </button>
            </div>

            {scanCompleted && (
              <button className={styles.successButton} onClick={goToVerify}>
                Continue →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= RIGHT ================= */}

      <div className={styles.scanRight}>
        <div className={styles.card}>
          <h2>Scanned Faces</h2>

          <div className={styles.previewGrid}>
            {FACE_ORDER.map((face) => (
              <FacePreview
                key={face}
                face={face}
                colors={cubeState.current.getFace(face)}
                scanned={cubeState.current.getFace(face).some(Boolean)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScanPhase;
