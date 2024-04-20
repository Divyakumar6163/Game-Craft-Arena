import Header from "./components/header";
import {Route,BrowserRouter, Routes} from "react-router-dom";
import Levels from "./components/level";
import GameRules from "./components/game-rules";
import Player1 from "./components/player1";
import Player2 from "./components/player2";
import PlayingOption from "./components/playingOption";
import Choice from "./components/choice";
import {useState} from 'react';
function App() {
  const [PlayerData, setPlayerData] = useState({
    object: '',
    category: '',
    description: ''
  });
  const [PlayerData2, setPlayerData2] = useState({
    object: '',
    category: '',
    description: ''
  });
  const [PlayerData3, setPlayerData3] = useState({
    object: '',
    category: '',
    description: ''
  });
  const [attempts,setAttempts]=useState();
  const [playerName,setPlayerName]=useState({
    player1:'',
    player2:'',
  });
  const [checkName, setCheckName] = useState(false);
  const [isRobot, setIsRobot] = useState();
  const [playingChoiceImg, setPlayingChoiceImg] = useState();
  function PlayerDetail(player1){
    setPlayerData(player1);
  }
  function PlayerDetail1(player2){
    setPlayerData2(player2);
  }
  function PlayerDetail2(player3){
    setPlayerData3(player3);
  }
  function PlayerAttempts(attempts){
    setAttempts(attempts);
  }
  function PlayerName(PlayerNameValue){
    setPlayerName(PlayerNameValue);
  }
  // console.log(isRobot);
  return (
    <main>
    <Header/>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<GameRules/>}/>
      <Route path="/playingOption" element={<PlayingOption checkOption={setIsRobot} playingChoiceImg={setPlayingChoiceImg}/>}/>
      <Route path="/choice" element={<Choice playingChoiceImg={setPlayingChoiceImg}/>}/>
      <Route path="/levels" element={<Levels playerNameData={(PlayerNameValue) => PlayerName(PlayerNameValue)} playerAttempts={(numAttempt) =>PlayerAttempts(numAttempt)} checkName={checkName} setCheckName={setCheckName} isRobot={isRobot}/>}/>
      <Route path="/player1" element={<Player1 player1Name={playerName.player1} playerDetail={(playerDetail)=>PlayerDetail(playerDetail)} playerDetail1={(playerDetail1)=>PlayerDetail1(playerDetail1)} playerDetail2={(playerDetail2)=>PlayerDetail2(playerDetail2)} attempts={attempts} />}/>
      <Route path="/player2" element={<Player2 player1Name={playerName.player1} player2Name={playerName.player2} dataReceive={PlayerData} dataReceive2={PlayerData2} dataReceive3={PlayerData3} attempts={attempts} isRobot={isRobot} playingChoiceImg={playingChoiceImg}/>}/>
      </Routes> 
     </BrowserRouter>
    </main>
  );
}

export default App;
