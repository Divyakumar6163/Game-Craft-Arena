// import GameRules from "./game-rules";
export default function Header() {
  return (
    <header style={{ background: "#09203F", height: "20vh" }}>
      <image src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F717768062982013%2F&psig=AOvVaw3" />
      <h1
        style={{
          textAlign: "center",
          margin: "0rem 0rem 12rem 0rem",
          padding: "2rem 0rem",
          color: "#f1f4ffff",
        }}
      >
        GUESS THE NAME
      </h1>
      {/* <GameRules /> */}
    </header>
  );
}
