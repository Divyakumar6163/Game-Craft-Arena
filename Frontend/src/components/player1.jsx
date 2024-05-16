import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./player1.module.css"; // Import the styles
import axios from "axios";
export default function Player1({
  playerDetail,
  player1Name,
  playerDetail1,
  playerDetail2,
  attempts,
  playingChoiceImg,
}) {
  let data;
  const object = useRef();
  const category = useRef();
  const description = useRef();
  const image = useRef();
  const object1 = useRef();
  const category1 = useRef();
  const description1 = useRef();
  const image1 = useRef();
  const object2 = useRef();
  const category2 = useRef();
  const description2 = useRef();
  const image2 = useRef();
  const [player1, setPlayer1] = useState({
    object: "",
    category: "",
    description: "",
    image: "",
  });
  const [player1_2, setPlayer1_2] = useState({
    object: "",
    category: "",
    description: "",
    image: "",
  });
  const [player1_3, setPlayer1_3] = useState({
    object: "",
    category: "",
    description: "",
    image: "",
  });
  const [check, setCheck] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  async function handleClick(event) {
    event.preventDefault();
    if (!playingChoiceImg) {
      if (
        object.current.value.trim().length === 0 ||
        category.current.value.trim().length === 0 ||
        description.current.value.trim().length === 0
      ) {
        setCheck(true);
        return;
      }
      setPlayer1({
        object: object.current.value,
        category: category.current.value,
        description: description.current.value,
      });
    } else if (playingChoiceImg) {
      if (object.current.value.trim().length === 0) {
        setCheck(true);
        return;
      }
      setPlayer1({
        object: object.current.value,
        image: image.current.value,
      });
      // console.log(object.current.value);
      // console.log(image.current.value);
    }
    if (attempts <= 8 && !playingChoiceImg) {
      if (
        object1.current.value.trim().length === 0 ||
        category1.current.value.trim().length === 0 ||
        description1.current.value.trim().length === 0
      ) {
        setCheck(true);
        return;
      }
      setPlayer1_2({
        object: object1.current.value,
        category: category1.current.value,
        description: description1.current.value,
      });
    } else if (attempts <= 8 && playingChoiceImg) {
      if (object1.current.value.trim().length === 0) {
        setCheck(true);
        return;
      }
      setPlayer1_2({
        object: object1.current.value,
        image: image1.current.value,
      });
    }
    if (attempts <= 3 && !playingChoiceImg) {
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
    } else if (attempts <= 3 && playingChoiceImg) {
      if (object2.current.value.trim().length === 0) {
        setCheck(true);
        return;
      }
      setPlayer1_3({
        object: object2.current.value,
        image: image2.current.value,
      });
    }
    if (!playingChoiceImg) {
      data = {
        object: object.current.value,
        category: category.current.value,
        description: description.current.value,
      };
    } else if (playingChoiceImg) {
      data = {
        object: object.current.value,
        image: image.current.value,
      };
    }
    // console.log(data);
    try {
      const response = await axios.post("http://localhost:8000/player1", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log("Data posted successfully:", response.data);
      setTimeout(() => {
        navigate("/player2");
      }, 0);
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
    }
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

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

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
              {!playingChoiceImg && (
                <input
                  type="text"
                  placeholder={`Category ${attempts <= 8 ? 1 : ""}`}
                  ref={category}
                  className={styles.playerInput}
                  required
                />
              )}
              {!playingChoiceImg ? (
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
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Image URL"
                    ref={image}
                    className={styles.playerInput}
                    required
                  />
                  <p> OR</p>
                  <input type="file" onChange={handleFileChange} />
                </>
              )}

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
                {!playingChoiceImg && (
                  <input
                    type="text"
                    placeholder="Category 2"
                    ref={category1}
                    className={styles.playerInput}
                    required
                  />
                )}
                {!playingChoiceImg ? (
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
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="Image URL"
                      ref={image1}
                      className={styles.playerInput}
                      required
                    />
                    <p> OR</p>
                    <input type="file" onChange={handleFileChange} />
                  </>
                )}
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
                {!playingChoiceImg && (
                  <input
                    type="text"
                    placeholder="Category 3"
                    ref={category2}
                    className={styles.playerInput}
                    required
                  />
                )}
                {!playingChoiceImg ? (
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
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="Image URL"
                      ref={image2}
                      className={styles.playerInput}
                      required
                    />
                    <p> OR</p>
                    <input type="file" onChange={handleFileChange} />
                  </>
                )}

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
