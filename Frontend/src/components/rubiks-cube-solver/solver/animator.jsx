export default class SolutionAnimator {
  constructor(cube3d) {
    this.cube = cube3d;

    this.moves = [];
    this.initialState = "";

    this.currentIndex = -1;

    this.speed = 1;

    this.playing = false;

    this.animating = false;

    this.updateCallback = () => {};

    this.finishCallback = () => {};
  }

  /* =======================================================
     Callbacks
  ======================================================= */

  onUpdate(callback) {
    this.updateCallback = callback;
  }

  onFinish(callback) {
    this.finishCallback = callback;
  }

  notify() {
    this.updateCallback(
      this.currentIndex,
      this.moves.length,
      this.moves[this.currentIndex] ?? null,
      this.playing,
    );
  }

  /* =======================================================
     Setup
  ======================================================= */

  setMoves(moves, initialState) {
    this.moves = [...moves];

    this.initialState = initialState;

    this.currentIndex = -1;

    this.playing = false;

    this.animating = false;

    this.cube.setState(initialState);

    this.notify();
  }

  /* =======================================================
     State
  ======================================================= */

  isPlaying() {
    return this.playing;
  }

  getCurrentMove() {
    return this.currentIndex;
  }

  getTotalMoves() {
    return this.moves.length;
  }

  setSpeed(speed) {
    this.speed = Number(speed);
  }

  getSpeed() {
    return this.speed;
  }
  inverseMove(move) {
    if (move.endsWith("2")) {
      return move;
    }

    if (move.endsWith("'")) {
      return move.slice(0, -1);
    }

    return move + "'";
  }
  /* =======================================================
     Play / Pause
  ======================================================= */

  async play() {
    if (this.playing) return;

    this.playing = true;

    this.notify();

    while (this.playing && this.currentIndex < this.moves.length - 1) {
      await this.next();

      if (!this.playing) break;
    }

    this.playing = false;

    this.notify();

    if (this.currentIndex === this.moves.length - 1) {
      this.finishCallback();
    }
  }

  pause() {
    this.playing = false;

    this.notify();
  }

  togglePlayPause() {
    if (this.playing) {
      this.pause();
    } else {
      this.play();
    }
  }

  /* =======================================================
     Forward
  ======================================================= */

  async next() {
    if (this.animating) return;

    if (this.currentIndex >= this.moves.length - 1) {
      return;
    }

    this.animating = true;

    this.currentIndex++;

    this.notify();

    const move = this.moves[this.currentIndex];

    await this.cube.animateMove(move, 400 / this.speed);

    this.animating = false;

    this.notify();
  }
  /* =======================================================
     Previous
  ======================================================= */

  async previous() {
    if (this.animating) return;

    if (this.currentIndex < 0) return;

    this.animating = true;

    const move = this.moves[this.currentIndex];

    await this.cube.animateMove(this.inverseMove(move), 400 / this.speed);

    this.currentIndex--;

    this.animating = false;

    this.notify();
  }

  first() {
    if (this.animating) return;

    this.pause();

    this.cube.setState(this.initialState);

    this.currentIndex = -1;

    this.notify();
  }

  async last() {
    if (this.animating) return;

    this.animating = true;

    this.pause();

    this.cube.setState(this.initialState);

    for (let i = 0; i < this.moves.length; i++) {
      await this.cube.animateMove(this.moves[i], 120 / this.speed);
    }

    this.currentIndex = this.moves.length - 1;

    this.animating = false;

    this.notify();
  }

  async jumpToMove(index) {
    if (this.animating) return;

    if (index < -1) index = -1;

    if (index >= this.moves.length) {
      index = this.moves.length - 1;
    }

    this.animating = true;

    this.pause();

    this.cube.setState(this.initialState);

    for (let i = 0; i <= index; i++) {
      await this.cube.animateMove(this.moves[i], 120 / this.speed);
    }

    this.currentIndex = index;

    this.animating = false;

    this.notify();
  }
  /* =======================================================
     Helpers
  ======================================================= */

  canGoNext() {
    return !this.animating && this.currentIndex < this.moves.length - 1;
  }

  canGoPrevious() {
    return !this.animating && this.currentIndex >= 0;
  }

  canPlay() {
    return !this.animating && this.moves.length > 0;
  }

  hasFinished() {
    return this.currentIndex === this.moves.length - 1 && this.moves.length > 0;
  }

  getCurrentMoveNotation() {
    if (this.currentIndex < 0 || this.currentIndex >= this.moves.length) {
      return null;
    }

    return this.moves[this.currentIndex];
  }

  reset() {
    this.pause();

    this.animating = false;

    this.currentIndex = -1;

    this.cube.setState(this.initialState);

    this.notify();
  }

  dispose() {
    this.pause();

    this.moves = [];

    this.currentIndex = -1;

    this.updateCallback = () => {};

    this.finishCallback = () => {};
  }
}
