import useMoveQueueStore from "../../store/moveQueueStore";
import CubeController from "./CubeController";

class QueueController {
  async play() {
    const store = useMoveQueueStore.getState();

    if (store.running) return;

    store.setRunning(true);

    while (true) {
      const move = store.popMove();

      if (!move) break;

      await CubeController.move(move);
    }

    store.setRunning(false);
  }
}

export default new QueueController();
