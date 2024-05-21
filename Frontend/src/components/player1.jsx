import { useRef, useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
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
  const [base64, setBase64] = useState("");
  const [base64_1, setBase64_1] = useState("");
  const [base64_2, setBase64_2] = useState("");
  const [selectedURL, setSelectedURL] = useState(null);
  const [selectedURL1, setSelectedURL1] = useState(null);
  const [selectedURL2, setSelectedURL2] = useState(null);
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
      if (
        (!base64 &&
          (object.current.value.trim().length === 0 ||
            image.current.value.trim().length === 0)) ||
        (base64 &&
          (object.current.value.trim().length === 0 ||
            base64.trim().length === 0))
      ) {
        setCheck(true);
        // setSelectedURL(false);
        return;
      }
      if (!base64) {
        // setSelectedURL(true);
        setPlayer1({
          object: object.current.value,
          image: image.current.value,
        });
      } else {
        setPlayer1({
          object: object.current.value,
          image: base64,
        });
      }
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
      if (
        (!base64_1 &&
          (object1.current.value.trim().length === 0 ||
            image1.current.value.trim().length === 0)) ||
        (base64_1 &&
          (object1.current.value.trim().length === 0 ||
            base64_1.trim().length === 0))
      ) {
        setCheck(true);
        return;
      }
      if (!base64_1) {
        setPlayer1_2({
          object: object1.current.value,
          image: image1.current.value,
        });
      } else {
        setPlayer1_2({
          object: object1.current.value,
          image: base64_1,
        });
      }
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
      if (
        (!base64_2 &&
          (object2.current.value.trim().length === 0 ||
            image2.current.value.trim().length === 0)) ||
        (base64_2 &&
          (object2.current.value.trim().length === 0 ||
            base64_2.trim().length === 0))
      ) {
        setCheck(true);
        return;
      }
      if (!base64_2) {
        setPlayer1_3({
          object: object2.current.value,
          image: image2.current.value,
        });
      } else {
        setPlayer1_3({
          object: object2.current.value,
          image: base64_2,
        });
      }
    }
    if (!playingChoiceImg) {
      data = {
        object: object.current.value,
        category: category.current.value,
        description: description.current.value,
      };
    } else if (playingChoiceImg) {
      if (!base64) {
        data = {
          object: object.current.value,
          image: image.current.value,
        };
      } else {
        data = {
          object: object.current.value,
          image: base64,
        };
      }
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
  // useEffect(() => {
  //   if (!image.current) setSelectedURL(false);
  //   else setSelectedURL(true);
  // }, [image.current]);
  const handleFileURL = () => {
    setSelectedURL(true);
  };
  const handleFileURL1 = () => {
    setSelectedURL1(true);
  };
  const handleFileURL2 = () => {
    setSelectedURL2(true);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      convertToBase64(file);
    }
  };
  const handleFileChange1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      convertToBase64_1(file);
    }
  };
  const handleFileChange2 = (event) => {
    const file = event.target.files[0];
    if (file) {
      convertToBase64_2(file);
    }
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBase64(reader.result);
      setSelectedURL(false);
    };
    reader.onerror = (error) => {
      console.error("Error reading file: ", error);
    };
  };
  const convertToBase64_1 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBase64_1(reader.result);
      setSelectedURL1(false);
    };
    reader.onerror = (error) => {
      console.error("Error reading file: ", error);
    };
  };
  const convertToBase64_2 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBase64_2(reader.result);
      setSelectedURL2(false);
    };
    reader.onerror = (error) => {
      console.error("Error reading file: ", error);
    };
  };
  const handleCross = () => {
    setBase64("");
    setSelectedURL(null);
  };
  const handleCross1 = () => {
    setBase64_1("");
    setSelectedURL1(null);
  };
  const handleCross2 = () => {
    setBase64_2("");
    setSelectedURL2(null);
  };
  function handleBack() {
    navigate("/levels");
  }
  // console.log(base64);
  // console.log(image.current.length);
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
                  {!base64 && (
                    <input
                      type="text"
                      placeholder="Image URL"
                      ref={image}
                      onChange={handleFileURL}
                      className={styles.playerInput}
                      required
                    />
                  )}
                  {selectedURL === null && (
                    <p
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontWeight: "700",
                      }}
                    >
                      {" "}
                      OR
                    </p>
                  )}
                  {!selectedURL && (
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className={styles.fileInput}
                    />
                  )}
                  {base64 && !selectedURL && (
                    <ImCross
                      onClick={handleCross}
                      style={{
                        marginTop: "1vh",
                        color: "white",
                        cursor: "pointer",
                      }}
                    />
                  )}
                  {base64 && !selectedURL && (
                    <img
                      src={base64}
                      alt="Selected"
                      // style={{ width: "200px", marginTop: "10px" }}
                      className={styles.fileImg}
                    />
                  )}
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
                    style={{ marginLeft: "20rem", marginTop: "9vh" }}
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
                    {!base64_1 && (
                      <input
                        type="text"
                        placeholder="Image URL"
                        ref={image1}
                        onChange={handleFileURL1}
                        className={styles.playerInput}
                        required
                      />
                    )}
                    {selectedURL1 === null && (
                      <p
                        style={{
                          color: "white",
                          textAlign: "center",
                          fontWeight: "700",
                        }}
                      >
                        {" "}
                        OR
                      </p>
                    )}
                    {!selectedURL1 && (
                      <input
                        type="file"
                        onChange={handleFileChange1}
                        className={styles.fileInput}
                      />
                    )}
                    {base64_1 && !selectedURL1 && (
                      <ImCross
                        onClick={handleCross1}
                        style={{
                          marginTop: "1vh",
                          color: "white",
                          cursor: "pointer",
                        }}
                      />
                    )}
                    {base64_1 && !selectedURL1 && (
                      <img
                        src={base64_1}
                        alt="Selected"
                        className={styles.fileImg}
                        // style={{ marginTop: "9vh" }}
                      />
                    )}
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
                      marginTop: "13.2rem",
                      marginLeft: "-7.5rem",
                    }}
                  >
                    *Please fill all the input fields
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
                    {!base64_2 && (
                      <input
                        type="text"
                        placeholder="Image URL"
                        ref={image2}
                        onChange={handleFileURL2}
                        className={styles.playerInput}
                        required
                      />
                    )}
                    {selectedURL2 === null && (
                      <p
                        style={{
                          color: "white",
                          textAlign: "center",
                          fontWeight: "700",
                        }}
                      >
                        {" "}
                        OR
                      </p>
                    )}
                    {!selectedURL2 && (
                      <input
                        type="file"
                        onChange={handleFileChange2}
                        className={styles.fileInput}
                      />
                    )}
                    {base64_2 && !selectedURL2 && (
                      <ImCross
                        onClick={handleCross2}
                        style={{
                          marginTop: "1vh",
                          color: "white",
                          cursor: "pointer",
                        }}
                      />
                    )}
                    {base64_2 && !selectedURL2 && (
                      <img
                        src={base64_2}
                        alt="Selected"
                        className={styles.fileImg}
                        // style={{ width: "200px", marginTop: "10px" }}
                      />
                    )}
                  </>
                )}

                {check && (
                  <span
                    className={styles.shake}
                    style={{
                      color: "red",
                      marginTop: "18vh",
                      marginLeft: "-17.5rem",
                    }}
                  >
                    *Please fill all the input fields
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
