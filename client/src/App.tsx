import React, {useState} from 'react';
import './App.css';
import axios from 'axios';
import PlayButtons from './PlayButtons';
import MenuButtons from './MenuButtons';
import Table from './Table';
import Modal from './views/Modal';

const rules:string[] = [
  '1. Set a username by enter it into the provided box and hit "Submit"',
  '2. Create a new game or find an existing one by typing the game ID into the appropriate box',
  '2.5. After finding an existing game, hit "Join Game" to actually join as a player',
  '3. If the game isn\'t started, press "Start Game" to initialize the game',
  '4. On your turn, you can choose to Hit or Stand. The goal is to reach 21 or higher without going over (i.e. going bust). \
  Numerical cards are worth their face value. Face cards are worth 10. Aces are worth 1 or 11, depending on preference. If you go \
  bust, your turn is over and you automatically lose.',
  '5. Once everyone has gone, the dealer will automatically play until their hand value is 17 or greater, and then wins/losses will be evaluated.',
  '6. Once the game is over, you can press the "Start Game" button to start a new game',
  '7. Hit "Leave Game" to leave a game lobby. When all active players leave a game, that lobby will be closed.',
  'NOTE: After leaving a game, it is recommended to refresh or close the page.'
];

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
  const [gameId, setGameId] = useState('');
  const [gameState, setGameState] = useState({players: [], hands: [[]], current_turn: 0});

  const findGame = (game_id:string) => {
    let id = game_id;
    if (game_id == undefined) {
      id = gameId;
    }
    axios({
      method: 'get',
      url: 'http://localhost:3001/api/games/state',
      headers: { 'game_id': id }
    })
    .then((res) => {
      console.log(res);
      setGameId(id);
      setCurrentView('game');
      setGameState(res.data);
    })
    .catch((err) => {
      console.error(err);
    })
  };

  const joinGame = (game_id:string) => {
    let id = game_id;
    if (game_id == undefined) {
      id = gameId;
    }
    axios({
      method: 'post',
      url: 'http://localhost:3001/api/games/join',
      data: { 'game_id': gameId, user_id: username}
    })
    .then((res) => {
      console.log(res);
      // setGameId(gameId);
      setCurrentView('game');
      setGameState(res.data);
    })
    .catch((err) => {
      console.error(err);
    })
  };

  const createGame = (game_id:string) => {
    axios({
      method: 'post',
      url: 'http://localhost:3001/api/games/create',
      data: { 'game_id': game_id, user_id: username}
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

  const startGame = () => {
    axios({
      method: 'post',
      url: 'http://localhost:3001/api/games/start',
      data: { 'game_id': gameId}
    })
    .then((res) => {
      console.log(res);
      setGameState(res.data);
    })
    .catch((err) => {
      console.error(err);
    })
  };

  const playMove = (move:string) => {
    axios({
      method: 'put',
      url: 'http://localhost:3001/api/games/move',
      data: { 'game_id': gameId, user_id: username, move: move}
    })
    .then((res) => {
      console.log(res);
      setGameState(res.data);
    })
    .catch((err) => {
      console.error(err);
    })
  };

  const leaveGame = () => {
    axios({
      method: 'delete',
      url: 'http://localhost:3001/api/games/leave',
      data: { 'game_id': gameId, user_id: username}
    })
    .then((res) => {
      console.log(res);
      setCurrentView('join-create');
      setGameId('');
    })
    .catch((err) => {
      console.error(err);
    })
  };

  return (
    <div className="App">
      <b>Play Blackjack</b> with a group of up to 4 players online! <br></br>
      Click <b>How to Play</b> below for instructions for using this page.
      {showRules && <Modal onCloseRequest = {() => {setShowRules(false)}}> {rules.map((rule) => {return <div className = "rule-line">{rule}</div>})} </Modal>}
      <MenuButtons startGame = {startGame} leaveGame = {leaveGame} joinGame = {joinGame}/>
      <Table gameId = {gameId} username = {username} currentView = {currentView} setCurrentView = {setCurrentView} setUsername = {setUsername} gameState = {gameState} findGame = {findGame} createGame = {createGame} joinGame = {joinGame}/>
      <PlayButtons playMove = {playMove} leaveGame = {leaveGame} setShowRules = {setShowRules}/>
    </div>
  );
}

export default App;
