import React from 'react';

function Player(props:any) {
  let {hands, idx, players, isHighlighted} = props;
  let player = players[idx];
  let hasPlayer = !(player === undefined);
  console.log(player, hasPlayer);

  let {wins, losses, user_id} = player;
  let hand = hands[idx + 1];

  const urlMap = function(card: string) {
    let path = '';

    if (card === 'hidden') {
      path = 'XX';
    } else {
      path = card.slice(0, -1);

      let suit = card.slice(-1);
      let suits = [ '♠', '♣', '♦', '♥'];
      let suitsAlpha = ['S', 'C', 'D', 'H'];

      let idx = suits.indexOf(suit);
      path = path + suitsAlpha[idx];

      if (path === "AD") {
        path = "aceDiamonds";
      }
    }
    let fullPath = `../images/${path}.png`
    console.log(fullPath);

    return <img className = "card" src = {fullPath} alt = {'card'}></img>
  };

  return (
    <div className = "player-box-container">
      {isHighlighted &&
      <div className = "player-box highlighted">
        <span className = "user_id">Player: {user_id}</span>
        <span className = "cards">{hand?.map(urlMap)}</span>
        <span className = "win-loss">Wins: {wins}
        Losses: {losses}</span>
        <i>It is {user_id}'s turn</i>
      </div>
      }
      {!isHighlighted &&
      <div className = "player-box">
        <span className = "user_id">Player: {user_id}</span>
        <span className = "cards">{hand?.map(urlMap)}</span>
        <span className = "wins">Wins: {wins}</span>
        <span className = "losses">Losses: {losses}</span>
      </div>
      }
    </div>
  );
}

export default Player;
