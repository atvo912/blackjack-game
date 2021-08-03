import React from 'react';

function MenuButtons(props:any) {
  const {startGame, leaveGame, joinGame} = props;

  return (
    <div id = "menu-buttons">
      <button onClick = {joinGame}>JOIN GAME</button>
      <button onClick = {startGame}>START GAME</button>
      <button className = "leave-game" onClick = {leaveGame}>LEAVE GAME</button>
    </div>
  );
}

export default MenuButtons;
