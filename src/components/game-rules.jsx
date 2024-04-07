import { NavLink } from "react-router-dom";
import styles from "./game-rules.module.css"; // Import CSS module

export default function GameRules() {
  return (
    <div className={styles.mainContainer}>
      <section className={styles.section}>
        <h2 className={styles.h2}>Game Rules</h2>
        <ul className={styles.ul}>
          <li className={styles.li}>
            Guess the name of the object that another person is giving.
          </li>
          <li className={styles.li}>
            Based on the level you chosen, you have to guess the object.
          </li>
          <li className={styles.li}>
            You are given with the description and the title of the object by
            another player.
          </li>
          <li>Click on the Next button to move to the next person</li>
        </ul>
        <NavLink className={styles.navlink} to="/levels">
          Start Playing
        </NavLink>
      </section>
    </div>
  );
}
