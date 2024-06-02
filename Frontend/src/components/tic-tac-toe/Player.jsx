import { useState } from "react";
import style from "./Player.module.css";
export default function Player({ isActive, ...props }) {
  const [initialName, finalName] = useState(props.name);
  const [isEditing, setIsEditing] = useState(false);
  function handleClick() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      props.onChangeName(props.symbol, initialName);
    }
  }
  function handleChange(event) {
    finalName(event.target.value); //event.target.value wo word nikalta h jo user enter krta h word by word aur wo letters argument ki tarah aata h & hence uss pr 2 predefined target aur value use krte h to give the value to the const with the useState().
  }
  console.log(isActive);
  return (
    <li className={`${isActive ? style.active : ""}`}>
      <span className={style.player}>
        <span
          className={`${!isActive ? style.playerName : style.playerNameActive}`}
        >
          {isEditing ? (
            <input
              className={style.input}
              type="text"
              onChange={handleChange}
              placeholder="Enter a Name"
            />
          ) : (
            initialName
          )}
        </span>
        <span
          className={`${isActive ? style.playerSymbolActive : style.playerSymbol}`}
        >
          {props.symbol}
        </span>
      </span>
      <button className={style.button} onClick={handleClick}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
