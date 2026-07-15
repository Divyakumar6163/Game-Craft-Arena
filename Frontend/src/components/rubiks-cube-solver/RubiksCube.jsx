import React from "react";
import styles from "./RubiksCube.module.css";

import { CubeProvider, useCube } from "./context/CubeContext";

import ScanPhase from "./components/ScanPhase";
import VerifyPhase from "./components/VerifyPhase";
import SolvePhase from "./components/SolvePhase";
import AnimatePhase from "./components/AnimatePhase";

const PHASES = [
  {
    title: "Scan Cube",
    subtitle: "Capture all six faces using your webcam.",
  },
  {
    title: "Verify Colors",
    subtitle: "Correct any incorrectly detected stickers.",
  },
  {
    title: "Solve Cube",
    subtitle: "Computing the optimal solution.",
  },
  {
    title: "Playback",
    subtitle: "Watch the cube being solved step-by-step.",
  },
];

function ProgressHeader() {
  const { currentPhase } = useCube();

  const labels = ["Scan", "Verify", "Solve", "Animate"];

  return (
    <div className={styles.progressHeader}>
      {labels.map((label, index) => {
        const phase = index + 1;

        const active = currentPhase >= phase;

        const completed = currentPhase > phase;

        return (
          <React.Fragment key={label}>
            <div
              className={`
                                ${styles.step}
                                ${active ? styles.activeStep : ""}
                                ${completed ? styles.completedStep : ""}
                            `}
            >
              <div className={styles.stepCircle}>{completed ? "✓" : phase}</div>

              <span className={styles.stepLabel}>{label}</span>
            </div>

            {phase !== labels.length && (
              <div
                className={`
                                    ${styles.stepLine}
                                    ${completed ? styles.activeLine : ""}
                                `}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function PhaseRenderer() {
  const { currentPhase } = useCube();

  switch (currentPhase) {
    case 1:
      return <ScanPhase />;

    case 2:
      return <VerifyPhase />;

    case 3:
      return <SolvePhase />;

    case 4:
      return <AnimatePhase />;

    default:
      return <ScanPhase />;
  }
}

function RubiksCubeContent() {
  const { currentPhase } = useCube();

  const phase = PHASES[currentPhase - 1];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Rubik's Cube Solver</h1>

        <p>Scan • Verify • Solve • Animate</p>
      </header>

      <ProgressHeader />

      <section className={styles.phaseHeader}>
        <h2>{phase.title}</h2>

        <p>{phase.subtitle}</p>
      </section>

      <main className={styles.main}>
        <div className={styles.phaseWrapper}>
          <PhaseRenderer />
        </div>
      </main>
    </div>
  );
}

export default function RubiksCube() {
  return (
    <CubeProvider>
      <RubiksCubeContent />
    </CubeProvider>
  );
}
