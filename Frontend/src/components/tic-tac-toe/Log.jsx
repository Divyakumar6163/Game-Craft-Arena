import style from "./Log.module.css";
export default function Log({ turns }) {
  return (
    <ol className={style.log}>
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {" "}
          {/* This is used to create dynamic string & this is function of Js NOT React */}
          {turn.player} selected {turn.square.row},{turn.square.col}
        </li>
      ))}
    </ol>
  );
}
