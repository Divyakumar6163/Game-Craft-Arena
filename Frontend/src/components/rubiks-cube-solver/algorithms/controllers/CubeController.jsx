import useCubeStore from "../../store/cubeStore";
import useHistoryStore from "../../store/historyStore";

import { createSolvedCube } from "../../algorithms/cubeState";
import { applyMove, applyMoves } from "../../algorithms/applyMoves";
import { generateScramble } from "../../algorithms/scramble";
import { MOVE_INFO } from "../../algorithms/moveInfo";
import { animateMove } from "../../hooks/useMoveAnimation";
class CubeController {
  async move(move) {
    const { cubies, setCube } = useCubeStore.getState();

    const nextCube = applyMove(cubies, move);

    setCube(nextCube);

    useHistoryStore.getState().addMove(move);
  }

  reset() {
    const { setCube } = useCubeStore.getState();

    setCube(createSolvedCube());

    useHistoryStore.getState().clearHistory();
  }

  scramble(length = 20) {
    const { setCube } = useCubeStore.getState();

    const scramble = generateScramble(length);

    const scrambledCube = applyMoves(createSolvedCube(), scramble);

    setCube(scrambledCube);

    const history = useHistoryStore.getState();

    history.clearHistory();

    scramble.forEach((move) => history.addMove(move));

    console.log("Scramble:", scramble.join(" "));

    return scramble;
  }
}

export default new CubeController();
