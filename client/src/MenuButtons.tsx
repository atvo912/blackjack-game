import React from 'react';

function MenuButtons(props:any) {
  const {startGame, leaveGame, joinGame, currentView, gameState} = props;

  const restart = gameState.current_turn >= gameState.players.length;

  return (
    <div id = "menu-buttons">
      {currentView === 'game' ? <button onClick = {joinGame}>JOIN GAME</button> :
      <button onClick = {joinGame} disabled>JOIN GAME</button>}
      {currentView !== 'game' && <button onClick = {startGame} disabled>START GAME</button>}
      {currentView === 'game' && !restart && <button onClick = {startGame}>START GAME</button>}
      {currentView === 'game' && restart && <button onClick = {startGame}>RESTART GAME</button>}
      {currentView === 'game' ? <button className = "leave-game" onClick = {leaveGame}>LEAVE GAME</button>:
      <button className = "leave-game" onClick = {leaveGame} disabled>LEAVE GAME</button>}
    </div>
  );
}

export default MenuButtons;
