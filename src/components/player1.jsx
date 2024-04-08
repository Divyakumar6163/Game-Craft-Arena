import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./player1.module.css"; // Import the styles

export default function Player1({ playerDetail, player1Name }) {
  const object = useRef();
  const category = useRef();
  const description = useRef();
  const [player1, setPlayer1] = useState({
    object: "",
    category: "",
    description: "",
  });
  const navigate = useNavigate();

  function handleClick(event) {
    event.preventDefault();
    setPlayer1({
      object: object.current.value,
      category: category.current.value,
      description: description.current.value,
    });
    setTimeout(() => {
      navigate("/player2");
    }, 0);
  }

  useEffect(() => {
    playerDetail(player1);
  }, [playerDetail, player1]);
  // console.log(player1Name);
  function handleBack() {
    navigate("/levels");
  }
  return (
    <div className={styles.mainContainer}>
      <button className={styles.backButton} onClick={handleBack}>
        Back
      </button>
      <div className={styles.playerContainer}>
        <h1 className={styles.playerHeader}>Player 1-{player1Name}</h1>
        <form className={styles.playerForm}>
          <input
            type="text"
            placeholder="Object"
            ref={object}
            className={styles.playerInput}
          />
          <input
            type="text"
            placeholder="Category"
            ref={category}
            className={styles.playerInput}
          />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Description"
            ref={description}
            className={`${styles.playerTextarea} ${styles.playerInput}`}
          ></textarea>
          <button
            type="submit"
            onClick={handleClick}
            className={styles.playerButton}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
