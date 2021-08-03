import React, {useEffect} from 'react';
import Player from './Player';
import Dealer from './Dealer';

function Game(props:any) {
  let {gameState, findGame} = props;
  let {started, hands, players, game_id, current_turn} = gameState;

  useEffect(() => {

    // setInterval(() => {console.log('hello')}, 4000);
    setInterval(() => {findGame(game_id)}, 4000);
  }, []);

  return (
    <div id = "game">
      <Dealer hands = {hands}/>
      <div id = "players">
      {players.map((player: any, idx: number) => <Player hands = {hands} players = {players} idx = {idx} isHighlighted = {idx === gameState.current_turn}/>)}
      {/* <Player hands = {hands} players = {players} idx = {0}/>
      <Player hands = {hands} players = {players} idx = {1}/>
      <Player hands = {hands} players = {players} idx = {2}/>
      <Player hands = {hands} players = {players} idx = {3}/> */}
      </div>
    </div>
  );
}

export default Game;
