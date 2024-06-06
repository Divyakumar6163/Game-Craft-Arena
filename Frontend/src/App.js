import { Route, BrowserRouter, Routes } from "react-router-dom";
import Levels from "./components/guess-the-name-game/level.jsx";
import GameRules from "./components/guess-the-name-game/game-rules";
import Player1 from "./components/guess-the-name-game/player1";
import Player2 from "./components/guess-the-name-game/player2";
import PlayingOption from "./components/guess-the-name-game/playingOption";
import Choice from "./components/guess-the-name-game/choice";
import GameChoice from "./components/Landing Page/gameChoice.jsx";
import Quiz from "./components/quiz/quiz.jsx";
import { useState } from "react";
import TicTacToe from "./components/tic-tac-toe/gameFile.jsx";
function App() {
  const [PlayerData, setPlayerData] = useState({
    object: "",
    category: "",
    description: "",
    image: "",
  });
  const [PlayerData2, setPlayerData2] = useState({
    object: "",
    category: "",
    description: "",
    image: "",
  });
  const [PlayerData3, setPlayerData3] = useState({
    object: "",
    category: "",
    description: "",
    image: "",
  });
  const [attempts, setAttempts] = useState();
  const [playerName, setPlayerName] = useState({
    player1: "",
    player2: "",
  });
  const [checkName, setCheckName] = useState(false);
  const [isRobot, setIsRobot] = useState();
  const [playingChoiceImg, setPlayingChoiceImg] = useState();
  function PlayerDetail(player1) {
    setPlayerData(player1);
  }
  function PlayerDetail1(player2) {
    setPlayerData2(player2);
  }
  function PlayerDetail2(player3) {
    setPlayerData3(player3);
  }
  function PlayerAttempts(attempts) {
    setAttempts(attempts);
  }
  function PlayerName(PlayerNameValue) {
    setPlayerName(PlayerNameValue);
  }

  return (
    <main>
      {/* <Header /> */}
      <BrowserRouter basename={"Guess-the-Name-Game"}>
        <Routes>
          <Route path="/" element={<GameChoice />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/guess-the-object" element={<GameRules />} />
          <Route
            path="/guess-the-object/playingOption"
            element={
              <PlayingOption
                checkOption={setIsRobot}
                playingChoiceImg={setPlayingChoiceImg}
              />
            }
          />
          <Route
            path="/guess-the-object/choice"
            element={<Choice playingChoiceImg={setPlayingChoiceImg} />}
          />
          <Route
            path="/guess-the-object/levels"
            element={
              <Levels
                playerNameData={(PlayerNameValue) =>
                  PlayerName(PlayerNameValue)
                }
                playerAttempts={(numAttempt) => PlayerAttempts(numAttempt)}
                checkName={checkName}
                setCheckName={setCheckName}
                isRobot={isRobot}
              />
            }
          />
          <Route
            path="/guess-the-object/player1"
            element={
              <Player1
                player1Name={playerName.player1}
                playerDetail={(playerDetail) => PlayerDetail(playerDetail)}
                playerDetail1={(playerDetail1) => PlayerDetail1(playerDetail1)}
                playerDetail2={(playerDetail2) => PlayerDetail2(playerDetail2)}
                attempts={attempts}
                playingChoiceImg={playingChoiceImg}
              />
            }
          />
          <Route
            path="/guess-the-object/player2"
            element={
              <Player2
                player1Name={playerName.player1}
                player2Name={playerName.player2}
                dataReceive={PlayerData}
                dataReceive2={PlayerData2}
                dataReceive3={PlayerData3}
                attempts={attempts}
                isRobot={isRobot}
                playingChoiceImg={playingChoiceImg}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
