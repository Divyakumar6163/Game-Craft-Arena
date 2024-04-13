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
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  function handleClick(event) {
    event.preventDefault();
    if (
      object.current.value.trim().length === 0 ||
      category.current.value.trim().length === 0 ||
      description.current.value.trim().length === 0
    ) {
      // alert("Please fill all the fields");
      setCheck(true);
      return;
    }
    setPlayer1({
      object: object.current.value,
      category: category.current.value,
      description: description.current.value,
    });
    if (attempts <= 8) {
      if (
        object1.current.value.trim().length === 0 ||
        category1.current.value.trim().length === 0 ||
        description1.current.value.trim().length === 0
      ) {
        // alert("Please fill all the fields");
        setCheck(true);
        return;
      }

      setPlayer1_2({
        object: object1.current.value,
        category: category1.current.value,
        description: description1.current.value,
      });
    }
    if (attempts <= 3) {
      if (
        object2.current.value.trim().length === 0 ||
        category2.current.value.trim().length === 0 ||
        description2.current.value.trim().length === 0
      ) {
        // alert("Please fill all the fields");
        setCheck(true);
        return;
      }
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
                placeholder={`Object ${attempts <= 8 ? 1 : ""}`}
                ref={object}
                className={styles.playerInput}
                required
              />
              <input
                type="text"
                placeholder={`Category ${attempts <= 8 ? 1 : ""}`}
                ref={category}
                className={styles.playerInput}
                required
              />
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder={`Description ${attempts <= 8 ? 1 : ""}`}
                ref={description}
                className={`${styles.playerTextarea} ${styles.playerInput}`}
                required
              ></textarea>

              {attempts >= 10 ? (
                <button type="submit" className={styles.playerButton}>
                  Submit
                </button>
              ) : (
                attempts > 3 && (
                  <button
                    type="submit"
                    className={styles.playerButton}
                    style={{ marginLeft: "20rem" }}
                  >
                    Submit
                  </button>
                )
              )}
            </form>
          </div>

          {attempts <= 8 && (
            <div>
              <form className={styles.playerForm} onSubmit={handleClick}>
                <input
                  type="text"
                  placeholder="Object 2"
                  ref={object1}
                  className={styles.playerInput}
                  required
                />
                <input
                  type="text"
                  placeholder="Category 2"
                  ref={category1}
                  className={styles.playerInput}
                  required
                />
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Description 2"
                  ref={description1}
                  className={`${styles.playerTextarea} ${styles.playerInput}`}
                  required
                ></textarea>
                {attempts <= 3 ? (
                  <button type="submit" className={styles.playerButton}>
                    Submit
                  </button>
                ) : null}
                {check && attempts > 3 && (
                  <span
                    className={styles.shake}
                    style={{
                      color: "red",
                      marginTop: "4.7rem",
                      marginLeft: "-7.5rem",
                    }}
                  >
                    Please fill all the input fields
                  </span>
                )}
              </form>
            </div>
          )}

          {attempts <= 3 && (
            <div>
              <form className={styles.playerForm} onSubmit={handleClick}>
                <input
                  type="text"
                  placeholder="Object 3"
                  ref={object2}
                  className={styles.playerInput}
                  required
                />
                <input
                  type="text"
                  placeholder="Category 3"
                  ref={category2}
                  className={styles.playerInput}
                  required
                />
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Description 3"
                  ref={description2}
                  className={`${styles.playerTextarea} ${styles.playerInput}`}
                  required
                ></textarea>
                {check && (
                  <span
                    className={styles.shake}
                    style={{
                      color: "red",
                      marginTop: "4.7rem",
                      marginLeft: "-17.5rem",
                    }}
                  >
                    Please fill all the input fields
                  </span>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
