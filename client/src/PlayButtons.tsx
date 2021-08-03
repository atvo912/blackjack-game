import React from 'react';

function PlayButtons(props:any) {
  const {playMove, leaveGame} = props;

  return (
    <div id = "play-buttons">
    <button onClick = {() => {playMove('hit')}}>HIT</button>
    <button onClick = {() => {playMove('stand')}}>STAND</button>
    {/* <button onClick = {leaveGame}>LEAVE GAME</button> */}
    <button>HOW TO PLAY</button>
  </div>
  );
}

export default PlayButtons;
