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
  const [currentScreen, setCurrentScreen] = useState('set-username');
  const [showRules, setShowRules] = useState(false);
  const [username, setUsername] = useState('');
  const [gameId, setGameId] = useState('');
  const [gameState, setGameState] = useState(dummyStartedGame);

  return (
    <div className="App">
      <b>NOTE:</b> You must set your username before you can play
      <MenuButtons />
      <Table />
      <PlayButtons />
    </div>
  );
}

export default App;
