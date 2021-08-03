import React from 'react';

function Dealer(props:any) {
  let {hands} = props;

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

      path = path;
    }
    let fullPath = `../images/${path}.png`
    console.log(fullPath);

    return <img className = "card" src = {fullPath} alt = {'card'}></img>
  };

  return (
    <div id = "dealer">
      {hands[0] && <>DEALER: {hands[0].map(urlMap)}</>}
    </div>
  );
}

export default Dealer;
