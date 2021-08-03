import React from 'react';

function PlayButtons(props:any) {
  const {playMove, leaveGame, setShowRules} = props;

  return (
    <div id = "play-buttons">
    <button onClick = {() => {playMove('hit')}}>HIT</button>
    <button onClick = {() => {playMove('stand')}}>STAND</button>
    {/* <button onClick = {leaveGame}>LEAVE GAME</button> */}
    <button onClick = {() => {setShowRules(true)}}>HOW TO PLAY</button>
  </div>
  );
}

export default PlayButtons;
