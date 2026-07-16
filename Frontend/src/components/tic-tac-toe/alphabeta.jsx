import { WINNING_COMBINATIONS } from "../../data/winning-combinations";

const AI = "O";
const HUMAN = "X";

function checkWinner(board) {
  for (const combination of WINNING_COMBINATIONS) {
    const a = board[combination[0].row][combination[0].column];
    const b = board[combination[1].row][combination[1].column];
    const c = board[combination[2].row][combination[2].column];

    if (a && a === b && b === c) {
      return a;
    }
  }

  return null;
}

function boardFull(board) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === null) return false;
    }
  }
  return true;
}

function alphaBeta(board, depth, alpha, beta, maximizingPlayer) {
  const winner = checkWinner(board);

  if (winner === AI) return 10 - depth;

  if (winner === HUMAN) return depth - 10;

  if (boardFull(board)) return 0;

  if (maximizingPlayer) {
    let bestScore = -Infinity;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] !== null) continue;

        board[i][j] = AI;

        const score = alphaBeta(board, depth + 1, alpha, beta, false);

        board[i][j] = null;

        bestScore = Math.max(bestScore, score);
        alpha = Math.max(alpha, bestScore);

        if (beta <= alpha) break;
      }
    }

    return bestScore;
  }

  let bestScore = Infinity;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] !== null) continue;

      board[i][j] = HUMAN;

      const score = alphaBeta(board, depth + 1, alpha, beta, true);

      board[i][j] = null;

      bestScore = Math.min(bestScore, score);
      beta = Math.min(beta, bestScore);

      if (beta <= alpha) break;
    }
  }

  return bestScore;
}

export function findBestMove(board) {
  let bestScore = -Infinity;

  let move = null;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] !== null) continue;

      board[i][j] = AI;

      const score = alphaBeta(board, 0, -Infinity, Infinity, false);

      board[i][j] = null;

      if (score > bestScore) {
        bestScore = score;
        move = {
          row: i,
          col: j,
        };
      }
    }
  }

  return move;
}
