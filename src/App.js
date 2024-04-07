import Header from "./components/header";
import {Route,BrowserRouter, Routes} from "react-router-dom";
import Levels from "./components/level";
import GameRules from "./components/game-rules";
import Player1 from "./components/player1";
import Player2 from "./components/player2";
import {useState} from 'react';
function App() {
  const [PlayerData, setPlayerData] = useState({
    object: '',
    category: '',
    description: ''
  });
  const [attempts,setAttempts]=useState();
  const [playerName,setPlayerName]=useState({
    player1:'',
    player2:'',
  });
  function PlayerDetail(player1){
    setPlayerData(player1);
  }
  function PlayerAttempts(attempts){
    setAttempts(attempts);
  }
  function PlayerName(PlayerNameValue){
    setPlayerName(PlayerNameValue);
    // console.log(PlayerNameValue);
  }
  return (
    <main>
    <Header/>
     <BrowserRouter>
     <Routes>
      {/* <Route path="/" element={<Header/>}/> */}
      <Route path="/" element={<GameRules/>}/>
      <Route path="/levels" element={<Levels playerNameData={(PlayerNameValue) => PlayerName(PlayerNameValue)} playerAttempts={(numAttempt) =>PlayerAttempts(numAttempt)}/>}/>
      {/* <Route path="/levels" element={<PlayerName/>}/> */}
      <Route path="/player1" element={<Player1 player1Name={playerName.player1} playerDetail={(playerDetail)=>PlayerDetail(playerDetail)}/>}/>
      <Route path="/player2" element={<Player2 player2Name={playerName.player2} dataReceived={PlayerData} attempts={attempts}/>}/>
      </Routes> 
     </BrowserRouter>
    </main>
  );
}

export default App;
