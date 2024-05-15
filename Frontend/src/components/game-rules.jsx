import { NavLink } from "react-router-dom";
import styles from "./game-rules.module.css"; // Import CSS module

export default function GameRules() {
  return (
    <div className={styles.mainContainer}>
      <section className={styles.section}>
        <h2 className={styles.h2}>Game Rules</h2>
        <ul className={styles.ul}>
          <li className={styles.li}>
            Guess the name of the object that another player is giving, by the
            help of category and description.
          </li>
          <li className={styles.li}>
            Based on the level you chosen, you have to guess the object, in the
            given number of attempts.
          </li>
          <li className={styles.li}>
            Levels which contain multiple objects, 3 extra attempts will be
            given for every correct guess.
          </li>
          <li className={styles.li}>
            Player are free to give any object and if Player 2 will not be able
            to guess that within the given attempts then he will loose and if
            guessed correctly then he will win.
          </li>
        </ul>
        <NavLink
          style={{
            backgroundColor: "#09203F",
            border: "4px solid #0956a9",
            color: "white",
            padding: "1rem 1rem",
            textAlign: "center",
            textDecoration: " none",
            display: " inline-block",
            fontSize: "1rem",
            margin: " -20px 4px 0rem 27rem",
            cursor: " pointer",
            borderRadius: "25px",
          }}
          to="/playingOption"
        >
          Start Playing &#129054;
        </NavLink>
      </section>
    </div>
  );
}
