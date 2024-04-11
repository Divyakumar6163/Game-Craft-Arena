import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./player1.module.css"; // Import the styles

export default function Player1({
  playerDetail,
  player1Name,
  playerDetail1,
  playerDetail2,
  attempts,
}) {
  const object = useRef();
  const category = useRef();
  const description = useRef();
  const object1 = useRef();
  const category1 = useRef();
  const description1 = useRef();
  const object2 = useRef();
  const category2 = useRef();
  const description2 = useRef();
  const [player1, setPlayer1] = useState({
    object: "",
    category: "",
    description: "",
  });
  const [player1_2, setPlayer1_2] = useState({
    object: "",
    category: "",
    description: "",
  });
  const [player1_3, setPlayer1_3] = useState({
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
    if (attempts <= 8) {
      setPlayer1_2({
        object: object1.current.value,
        category: category1.current.value,
        description: description1.current.value,
      });
    }
    if (attempts <= 3) {
      setPlayer1_3({
        object: object2.current.value,
        category: category2.current.value,
        description: description2.current.value,
      });
    }
    setTimeout(() => {
      navigate("/player2");
    }, 0);
  }
  useEffect(() => {
    playerDetail(player1);
  }, [playerDetail, player1]);
  useEffect(() => {
    playerDetail1(player1_2);
  }, [playerDetail1, player1_2]);
  useEffect(() => {
    playerDetail2(player1_3);
  }, [playerDetail2, player1_3]);

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

        <div style={{ display: "flex", displayDirection: "row" }}>
          <div>
            <form className={styles.playerForm} onSubmit={handleClick}>
              <input
                type="text"
                placeholder="Object"
                ref={object}
                className={styles.playerInput}
                required
              />
              <input
                type="text"
                placeholder="Category"
                ref={category}
                className={styles.playerInput}
                required
              />
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Description"
                ref={description}
                className={`${styles.playerTextarea} ${styles.playerInput}`}
                required
              ></textarea>

              <button
                type="submit"
                className={styles.playerButton}
                // disabled={
                //   ((player1_2.object === "" ||
                //     player1_2.category === "" ||
                //     player1_2.description === "" ||
                //     player1_3.object === "" ||
                //     player1_3.category === "" ||
                //     player1_3.description === "") &&
                //     attempts <= 3) ||
                //   ((player1_2.object === "" ||
                //     player1_2.category === "" ||
                //     player1_2.description === "") &&
                //     attempts <= 8)
                //     ? true
                //     : false
                // }
              >
                Submit
              </button>
              <p style={{ color: "red", margin: "1rem 1rem 2rem 3rem" }}>
                *Please fill all the input fields
              </p>
            </form>
          </div>

          {attempts <= 8 && (
            <div>
              <form className={styles.playerForm} onSubmit={handleClick}>
                <input
                  type="text"
                  placeholder="Object"
                  ref={object1}
                  className={styles.playerInput}
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  ref={category1}
                  className={styles.playerInput}
                  required
                />
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Description"
                  ref={description1}
                  className={`${styles.playerTextarea} ${styles.playerInput}`}
                  required
                ></textarea>
                {/* <button type="submit" className={styles.playerButton}>
                Submit
              </button> */}
              </form>
            </div>
          )}

          {attempts <= 3 && (
            <div>
              <form className={styles.playerForm} onSubmit={handleClick}>
                <input
                  type="text"
                  placeholder="Object"
                  ref={object2}
                  className={styles.playerInput}
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  ref={category2}
                  className={styles.playerInput}
                  required
                />
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Description"
                  ref={description2}
                  className={`${styles.playerTextarea} ${styles.playerInput}`}
                  required
                ></textarea>
                {/* <button type="submit" className={styles.playerButton}>
                Submit
              </button> */}
              </form>
            </div>
          )}
        </div>
        {/* <button type="submit" className={styles.playerButton}>
          Submit
        </button> */}
      </div>
    </div>
  );
}
