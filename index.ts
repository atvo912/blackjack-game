const express = require('express');

const db = require('./db');
const app = express();

const port = 3000;

app.use(express.json());

// Get current gamestate
// Req must provide gameId and playerId
app.get('/api/games/state', function(req, res) {
    // let gamestate = {game_id: "TAI#604", started: false, hands: [[ 'J♦', 'Q♥' ], [ '8♥', '3♦' ], [ 'Q♣', 'Q♦' ], [ '2♦', 'A♥' ]], players: ['me', 'you'], current_turn: 0};
    let game_id = req.header('game_id');

    // We may want to check to see if the user_id corresponds to someone in the game
    let user_id = req.header('user_id');

    db.Game.findOne({game_id: game_id})
    .then((data) => {
      if (!data) {
        throw data;
      }
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(404);
    })
    return;
});

// Play a move
app.post('/api/moves', function(req, res) {
    // moves are 'hit' and 'stand'
    res.sendStatus(201);
    return;
});

// Initialize new game LOBBY
// Should specify gameId
app.post('/api/games/create', function(req, res) {
  let {body} = req;
    // Check to see if gameId exists already. If it does, return an error.
    // If gameId is available, create a new game in our DB
    db.Game.create({game_id: body.game_id});
    res.sendStatus(201);
    return;
});

// Join a game
app.post('/api/games/join', function(req, res) {
  let {game_id, user_id} = req.body;
  console.log(game_id, user_id);
  db.Game.findOne({game_id: game_id})
  .then((result) => {
    // check for started: false
    // check for # players
    // check to see if player already exists
    let hasNotStarted = result.started === false;
    let hasRoom = result.players.length < 4;
    let isPlayerNew = !result.players.includes(user_id);

    if (hasNotStarted && hasRoom && isPlayerNew) {
      console.log('player should be added');
      return db.Game.findOneAndUpdate({game_id: game_id}, {'$push': {players: user_id}}, {new: true});
    } else {
      throw new Error('Player could not be added');
    }
  })
  .then((result) => {
    console.log(result);
    res.json(result);
    if (!result) {
      throw result;
    }
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(400);
  })
  return;
});

// START a game once everyone is in lobby
app.post('/api/games/start', function(req, res) {

  // Our post request needs to have a gameId on it
  // We need to verify the gameId exists and hasn't started already

  // Initialize/shuffle deck
  function orderedDeck(): string[] {
    let suits = [ '♠', '♣', '♦', '♥'];
    let values = [ 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2 ];
    let deck : string[] = [];

    suits.forEach(function(suit) {
      values.forEach(function(value) {
        deck.push(value + suit);
      });
    });

    return deck;
  };

  function shuffleDeck(deck): string[] {
      let newDeck: string[] = [];
      let availableIndices: number[] = [];
      for (let i = 0; i < deck.length; i++) {
        availableIndices.push(i);
      }

      while(newDeck.length < deck.length) {
        let randomJ = Math.floor(Math.random() * (availableIndices.length));
        let randomI = availableIndices[randomJ];
        let randomCard = deck[randomI];
        newDeck.push(randomCard);
        availableIndices.splice(randomJ, 1);
      }
      return newDeck;
  };

  let deck = shuffleDeck(orderedDeck());

  // determine how many players there are
  // numPlayers is a dummy variable so we don't need to do the DB query right now
  // It's denoted 3 + 1 to specify that the dealer must be counted too
  let numPlayers = 3 + 1;
  let hands:any = [];

  for (let i = 0; i < numPlayers; i++) {
      hands.push([]);
  }

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < numPlayers; j++) {
      hands[j].push(deck.pop());
    }
  }
  console.log(hands);

  res.sendStatus(201);
  return;
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})