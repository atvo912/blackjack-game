import React from 'react';
import SetUser from './views/SetUser';
import JoinCreate from './views/JoinCreate';
import Game from './views/Game';

function Table(props:any) {
  let {username, currentView, setCurrentView, setUsername, gameState, findGame, gameId} = props;
  return (
    <div id = "table">
      Currently logged in as: {username}<br></br>
      TABLE VIEW: {currentView}<br></br>
      Game ID: {gameId}<br></br>
      Game state: {JSON.stringify(gameState)}
      {props.currentView === 'set-user' && <SetUser setCurrentView = {setCurrentView} setUsername = {setUsername}/>}
      {props.currentView === 'join-create' && <JoinCreate findGame = {findGame}/>}
      {props.currentView === 'game' && <Game gameState = {gameState}/>}
    </div>
  );
}

export default Table;
