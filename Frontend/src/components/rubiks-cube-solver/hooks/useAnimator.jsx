import { useCallback } from "react";
import { useCube } from "../context/CubeContext";

const useAnimator = () => {
  const {
    animator,

    solution,

    moveIndex,
    setMoveIndex,

    currentMove,
    setCurrentMove,

    isPlaying,
    setIsPlaying,

    speed,
    setSpeed,
  } = useCube();

  // ==========================================
  // Sync UI from animator
  // ==========================================

  const syncState = useCallback(() => {
    if (!animator.current) return;

    setMoveIndex(animator.current.getCurrentMove());

    setCurrentMove(animator.current.getCurrentMoveNotation());

    setIsPlaying(animator.current.isPlaying());
  }, [animator, setMoveIndex, setCurrentMove, setIsPlaying]);

  // ==========================================
  // Controls
  // ==========================================

  const first = useCallback(async () => {
    if (!animator.current) return;

    await animator.current.first();

    syncState();
  }, [animator, syncState]);

  const previous = useCallback(async () => {
    if (!animator.current) return;

    await animator.current.previous();

    syncState();
  }, [animator, syncState]);

  const next = useCallback(async () => {
    if (!animator.current) return;

    await animator.current.next();

    syncState();
  }, [animator, syncState]);

  const last = useCallback(async () => {
    if (!animator.current) return;

    await animator.current.last();

    syncState();
  }, [animator, syncState]);

  const togglePlayPause = useCallback(async () => {
    if (!animator.current) return;

    await animator.current.togglePlayPause();

    syncState();
  }, [animator, syncState]);

  const jumpToMove = useCallback(
    async (index) => {
      if (!animator.current) return;

      await animator.current.jumpToMove(index);

      syncState();
    },
    [animator, syncState],
  );

  const updateSpeed = useCallback(
    (value) => {
      const newSpeed = Number(value);

      setSpeed(newSpeed);

      if (animator.current) {
        animator.current.setSpeed(newSpeed);
      }
    },
    [animator, setSpeed],
  );

  // ==========================================
  // Derived values (React state is source of truth)
  // ==========================================

  const totalMoves = solution.length;

  const currentMoveNumber = moveIndex < 0 ? 0 : moveIndex + 1;

  const canGoPrevious = moveIndex >= 0;

  const canGoNext = moveIndex < totalMoves - 1;

  const canPlay = totalMoves > 0;

  return {
    first,
    previous,
    next,
    last,

    togglePlayPause,

    jumpToMove,

    updateSpeed,

    speed,

    isPlaying,

    currentMove,

    currentMoveNumber,

    totalMoves,

    canGoPrevious,

    canGoNext,

    canPlay,
  };
};

export default useAnimator;
