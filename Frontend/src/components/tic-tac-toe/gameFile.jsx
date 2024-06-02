import Player from "./Player.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GameBoard from "./GameBoard.jsx";
import Log from "./Log.jsx";
import { WINNING_COMBINATIONS } from "../../data/winning-combinations.js";
import GameOver from "./GameOver.jsx";
import style from "./gameFile.module.css";
const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(prevTurns) {
  let currentPlayer = "X";
  if (prevTurns.length > 0 && prevTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    // combination me array ke andar jo array hai jo dictionaries ko contain kr rha h (i.e. 3 pairs of dictionary ) uss array ka 0th mtlb phela pair dictionary usko target krega aur .row se uske row ka index aa jayega.
    const firstSqareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const SecondSqareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSqareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSqareSymbol === SecondSqareSymbol &&
      firstSqareSymbol === thirdSqareSymbol &&
      SecondSqareSymbol === thirdSqareSymbol &&
      firstSqareSymbol != null
    ) {
      winner = players[firstSqareSymbol]; //  As the firstSqareSymbol contains X,O or null hence which works as a key for dictionary players
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurns) {
    // Ye niche 2 line destructure kr rhe honge updatedturns wale array ko jo App() me h aur wo turns ke naam se yha bheja gya h uski values yaha de dega
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}
// Basically prevTurns & gameTurns are same
function TicTacToe() {
  // const [activePlayer,setActivePlayer]=useState("X");
  // uper wale metod se bhi deriveActivePlayer wala kaam kr skte h but hm log useState use krna avoid krna chahte h
  const navigate = useNavigate();
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleEntry(rowInt, colInt) {
    // setActivePlayer((activePlayer)=> activePlayer==='X' ? 'O':"X");

    // Isme niche wale me basically ek setGameTurns function h useState ka wo ek arguments lega prevTurns jiski value gameTurns ke barabar hogi wo phr condition check krega if wali agr X mila to O me change kr dega currentPlayer ko taki uske baad updatedTurns me player ki entry me player ke symbol change ho ske.  NOTE: isme prevTurns[0] latest value dega.
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowInt, col: colInt }, player: currentPlayer },
        ...prevTurns,
      ];
      // Yhi updated wla array hi return hoga prevTurns me aur uske 0th index me naye wale ki value hai as ...prevTurns is after new Elementin above updatedTurns and hence prevTurns[0].player is called their.
      return updatedTurns;
    });
  }

  // The Function just below is used to restart the gameBoard, as sirf useState alela wo function h jo indirectly sb kuch ctrl kr rha h hence agr hm gameTurns wala Array hi null kr de to saare function Re Execute honge.Hence we will Receive our task.
  // NOTE: isse null krte samay original array bhi null ho yani initialGameBoard wala array bhi null krna pdega as it got changed agr hmne gameBoard me initialGameBoard ki value copy nhi ki ho using map.
  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName, // To change the name only at that symbol
      };
    });
  }
  function handleBack() {
    navigate("/");
  }
  return (
    <main className={style.main}>
      <h1 className={style.h1}>Tic Tac Toe</h1>
      <div className={style.gameContainer}>
        <ol className={style.players}>
          <Player
            name={PLAYERS.X}
            symbol="X"
            onChangeName={handlePlayerNameChange}
            isActive={activePlayer === "X" ? "active" : undefined}
          />
          <Player
            name={PLAYERS.O}
            symbol="O"
            onChangeName={handlePlayerNameChange}
            isActive={activePlayer === "O" ? "active" : undefined}
          />
        </ol>
        {winner != null || hasDraw ? (
          <GameOver winner={winner} onReset={handleRestart}></GameOver>
        ) : undefined}
        <GameBoard board={gameBoard} onSelectSquare={handleEntry}></GameBoard>
      </div>
      <Log turns={gameTurns}></Log>
      <button className={style.backButton} onClick={handleBack}>
        Back
      </button>
    </main>
  );
}

export default TicTacToe;
