import React from 'react';

function Dealer(props:any) {
  let {hands} = props;
  return (
    <div id = "dealer">
      DEALER CARDS: {hands[0]}
    </div>
  );
}

export default Dealer;
