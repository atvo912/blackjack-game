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
  const [gameId, setGameId] = useState('');
  const [gameState, setGameState] = useState({players: [], hands: [], current_turn: 0});

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
      <b>NOTE:</b> You must set your username before you can play
      <MenuButtons startGame = {startGame} leaveGame = {leaveGame} joinGame = {joinGame}/>
      <Table gameId = {gameId} username = {username} currentView = {currentView} setCurrentView = {setCurrentView} setUsername = {setUsername} gameState = {gameState} findGame = {findGame} createGame = {createGame} joinGame = {joinGame}/>
      <PlayButtons playMove = {playMove} leaveGame = {leaveGame}/>
    </div>
  );
}

export default App;
