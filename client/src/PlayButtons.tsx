import React from 'react';

function PlayButtons(props:any) {
  const {playMove, leaveGame, setShowRules, setShowTech, currentView, gameState, username} = props;

  const enableHitStand = currentView === 'game' && username === gameState.players[gameState.current_turn]?.user_id;
  // console.log('enableHitStand', enableHitStand)

  return (
    <div id = "play-buttons">
      {enableHitStand ? <button onClick = {() => {playMove('hit')}}>HIT</button> :
      <button onClick = {() => {playMove('hit')}} disabled>HIT</button>}
      {enableHitStand ? <button onClick = {() => {playMove('stand')}}>STAND</button> :
      <button onClick = {() => {playMove('stand')}} disabled>STAND</button>}
    {/* <button onClick = {leaveGame}>LEAVE GAME</button> */}
    <button className = "how-to-play" onClick = {() => {setShowRules(true)}}>HOW TO PLAY</button>
    <button className = "about-tech" onClick = {() => {setShowTech(true)}}>ABOUT THE TECH</button>
  </div>
  );
}

export default PlayButtons;
