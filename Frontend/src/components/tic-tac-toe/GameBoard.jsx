import React from "react";
import styles from "./GameBoard.module.css";
export default function GameBoard({ onSelectSquare, board }) {
  // Ye niche commented wla bhi chla but iske baad hme ek button ek baar press ho iske liye jo code krte usme phr isse lift state krke bhejna pdta isiliye hmne isko hatta kr App() me jo already func tha usme ek aur useState() use krke iski value extract kr liye

  // const [gameBoard,setGameBoard]=useState(initialGameBoard);
  // function handleEntry(rowInt,colInt){
  //     const updatedGameBoard=[...gameBoard.map((innerArray)=>[...innerArray])];
  //     updatedGameBoard[rowInt][colInt]=activePlayerSymbol;
  //     setGameBoard(updatedGameBoard);
  //     onSelectSquare();
  // }
  return (
    <ol className={styles.gameBoard}>
      {board.map((row, rowInt) => (
        <li key={rowInt}>
          <ol className={styles.ol}>
            {row.map((playerSymbol, colInt) => (
              <li key={colInt}>
                <button
                  onClick={() => onSelectSquare(rowInt, colInt)}
                  disabled={
                    playerSymbol === "X" || playerSymbol === "O" ? true : false
                  }
                  className={styles.gameBoardButton}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
