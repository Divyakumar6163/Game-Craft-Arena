import { useCallback } from "react";
import { FACE_NAMES, FACE_COLORS, SCAN_ORDER } from "../solver/cube-state";
import { useCube } from "../context/CubeContext";

const useScanner = () => {
  const {
    scanner,
    cubeState,

    webcamVideoRef,
    scanOverlayRef,
    animationFrameRef,

    currentPhase,
    scanIndex,
    setScanIndex,

    setDetectedColors,
    refreshCube,
    setCurrentPhase,
  } = useCube();

  // =============================================
  // Start Camera
  // =============================================

  const startScanning = useCallback(async () => {
    const video = webcamVideoRef.current;
    const canvas = scanOverlayRef.current;

    if (!video || !canvas) return false;

    const success = await scanner.current.startCamera(video);

    if (!success) {
      showScanError(
        "Could not access webcam.\nPlease allow camera permission.",
      );
      return false;
    }

    await new Promise((resolve) => {
      if (video.videoWidth > 0) return resolve();

      video.addEventListener("loadeddata", resolve, {
        once: true,
      });
    });

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    runScanLoop();

    return true;
  }, []);

  // =============================================
  // Stop Camera
  // =============================================

  const stopScanning = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    scanner.current.stopCamera();
  }, []);

  // =============================================
  // Continuous Detection Loop
  // =============================================

  const runScanLoop = useCallback(() => {
    const video = webcamVideoRef.current;
    const canvas = scanOverlayRef.current;

    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");

    const loop = () => {
      if (currentPhase !== 1 || !scanner.current.isActive) return;

      const colors = scanner.current.detectColors(video, canvas);

      scanner.current.drawOverlay(ctx, canvas.width, canvas.height, colors);

      setDetectedColors(colors);

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    loop();
  }, [currentPhase]);

  // =============================================
  // Error Overlay
  // =============================================

  const showScanError = (message) => {
    const canvas = scanOverlayRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ff4444";
    ctx.font = "18px Arial";
    ctx.textAlign = "center";

    ctx.fillText(message, canvas.width / 2, canvas.height / 2);
  };

  // =============================================
  // Capture Current Face
  // =============================================

  const captureFace = (colors) => {
    if (!colors || colors.length !== 9) return;

    const face = SCAN_ORDER[scanIndex];

    colors[4] = face;

    let finalColors = [...colors];

    if (scanner.current.isMirrored) {
      for (let row = 0; row < 3; row++) {
        const a = row * 3;
        const b = row * 3 + 2;

        [finalColors[a], finalColors[b]] = [finalColors[b], finalColors[a]];
      }
    }

    cubeState.current.setFace(face, finalColors);

    refreshCube();

    const next = scanIndex + 1;

    setScanIndex(next);

    if (next >= SCAN_ORDER.length) {
      setTimeout(() => {
        setCurrentPhase(2);
      }, 700);
    }
  };

  // =============================================
  // Reset Scanner
  // =============================================

  const resetScanner = () => {
    stopScanning();

    setScanIndex(0);

    setDetectedColors([]);
  };

  // =============================================
  // Face Details
  // =============================================

  const currentFace =
    scanIndex >= SCAN_ORDER.length ? null : SCAN_ORDER[scanIndex];

  const currentFaceName = currentFace ? FACE_NAMES[currentFace] : "Completed";

  const currentFaceColor = currentFace ? FACE_COLORS[currentFace] : "#34C759";

  return {
    startScanning,
    stopScanning,
    captureFace,
    resetScanner,

    currentFace,
    currentFaceName,
    currentFaceColor,
  };
};

export default useScanner;
