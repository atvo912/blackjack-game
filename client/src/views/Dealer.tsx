import React from 'react';

function Dealer(props:any) {
  let {hand} = props;
  return (
    <div id = "dealer">
      DEALER CARDS: {hand}
    </div>
  );
}

export default Dealer;
