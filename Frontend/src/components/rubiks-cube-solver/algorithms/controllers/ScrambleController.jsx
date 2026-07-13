import { generateScramble } from "../../algorithms/scramble";

import useMoveQueueStore from "../../store/moveQueueStore";

import QueueController from "./QueueController";

class ScrambleController {
  async scramble(length = 20) {
    const scramble = generateScramble(length);

    useMoveQueueStore.getState().addMoves(scramble);

    await QueueController.play();

    return scramble;
  }
}

export default new ScrambleController();
