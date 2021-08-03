import React from 'react';

function Player(props:any) {
  let {hands, idx, players, isHighlighted} = props;
  let player = players[idx];
  let hasPlayer = !(player === undefined);
  console.log(player, hasPlayer);

  let {wins, losses, user_id} = player;
  let hand = hands[idx + 1];


  return (
    <div className = "player-box-container">
      {isHighlighted &&
      <div className = "player-box highlighted">
        <span className = "user_id">Player: {user_id}</span>
        <span className = "cards">Cards: {hand}</span>
        <span className = "win-loss">Wins: {wins}
        Losses: {losses}</span>
        <span>IT'S MY TURN</span>
      </div>
      }
      {!isHighlighted &&
      <div className = "player-box">
        <span className = "user_id">Player: {user_id}</span>
        <span className = "cards">Cards: {hand}</span>
        <span className = "win-loss">Wins: {wins}
        Losses: {losses}</span>
      </div>
      }
    </div>
  );
}

export default Player;
