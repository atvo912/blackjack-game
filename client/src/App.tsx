import React, {useState, useContext, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import PlayButtons from './PlayButtons';
import MenuButtons from './MenuButtons';
import Table from './Table';

const dummyStartedGame = {
  "started": true,
  "deck": [],
  "hands": [
      [
          "5♥",
          "hidden"
      ],
      [
          "8♥",
          "Q♥"
      ],
      [
          "8♦",
          "10♥"
      ]
  ],
  "players": [
      {
          "wins": 0,
          "losses": 3,
          "_id": "610817fa52f46052af83b4f5",
          "user_id": "atvo912"
      },
      {
          "wins": 0,
          "losses": 2,
          "_id": "6108184c52f46052af83b4fe",
          "user_id": "atvo913"
      }
  ],
  "_id": "610817f552f46052af83b4f2",
  "game_id": "TAI#604",
  "__v": 0,
  "current_turn": 0
};



function App() {
  const [currentView, setCurrentView] = useState('set-user');
  const [showRules, setShowRules] = useState(false);
  const [username, setUsername] = useState('');
  const [gameId, setGameId] = useState('TAI#69');
  const [gameState, setGameState] = useState(dummyStartedGame);

  const findGame = (game_id:string) => {
    axios({
      method: 'get',
      url: 'http://localhost:3001/api/games/state',
      headers: { 'game_id': game_id }
    })
    .then((res) => {
      console.log(res);
      setGameId(game_id);
      setCurrentView('game');
      setGameState(res.data);
    })
    .catch((err) => {
      console.error(err);
    })
  };

  const createGame = () => {

  };

  return (
    <div className="App">
      <b>NOTE:</b> You must set your username before you can play
      <MenuButtons />
      <Table gameId = {gameId} username = {username} currentView = {currentView} setCurrentView = {setCurrentView} setUsername = {setUsername} gameState = {gameState} findGame = {findGame}/>
      <PlayButtons />
    </div>
  );
}

export default App;
