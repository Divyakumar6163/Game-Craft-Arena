import { NavLink, useNavigate } from "react-router-dom";
import styles from "./game-rules.module.css"; // Import CSS module
import Header from "./header";
export default function GameRules() {
  const navigate = useNavigate();
  function handleBack() {
    navigate("/");
  }
  return (
    <>
      <Header />
      <div className={styles.mainContainer}>
        <button className={styles.backButton} onClick={handleBack}>
          Back
        </button>
        <section className={styles.section}>
          <h2 className={styles.h2}>Game Rules</h2>
          <ul className={styles.ul}>
            <li className={styles.li}>
              Guess the name of the object that another player is giving, by the
              help of category and description.
            </li>
            <li className={styles.li}>
              Based on the level you chosen, you have to guess the object, in
              the given number of attempts.
            </li>
            <li className={styles.li}>
              Levels which contain multiple objects, 3 extra attempts will be
              given for every correct guess.
            </li>
            <li className={styles.li}>
              Player are free to give any object and if Player 2 will not be
              able to guess that within the given attempts then he will loose
              and if guessed correctly then he will win.
            </li>
          </ul>
          <div style={{ position: "relative" }}>
            <NavLink
              style={{
                backgroundColor: "#09203F",
                border: "4px solid #0956a9",
                color: "white",
                padding: "1rem 1.5rem",
                textAlign: "center",
                textDecoration: "none",
                display: "inline-block",
                fontSize: "1rem",
                cursor: "pointer",
                borderRadius: "25px",
                position: "absolute",
                top: "1rem",
                right: "1rem",
                transition: "background-color 0.3s ease, transform 0.3s ease",
              }}
              to="/guess-the-object/playingOption"
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#03142a";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#09203F";
                e.target.style.transform = "scale(1)";
              }}
            >
              Start Playing &#129054;
            </NavLink>
          </div>
        </section>
      </div>
    </>
  );
}
