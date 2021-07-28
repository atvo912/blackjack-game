const express = require('express');

const db = require('./db');
const app = express();

const port = 3000;

app.use(express.json());

// Get current gamestate
// Req must provide gameId and playerId
app.get('/api/gamestate', function(req, res) {
    let gamestate = {deck: [], lastPlayer: 0, lastPlay: []};
    res.json(gamestate);
    return;
});

// Play a move
app.post('/api/moves', function(req, res) {
    res.sendStatus(201);
    return;
});

// Initialize new game
// Should specify gameId
app.post('/api/games/create', function(req, res) {
  let {body} = req;
    // Check to see if gameId exists already. If it does, return an error.
    // If gameId is available, create a new game in our DB

    // If we created a new game, initialize it

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
    let hands:any = [];
    hands.push(deck.slice(0, 13));
    hands.push(deck.slice(13, 26));
    hands.push(deck.slice(26, 39));
    hands.push(deck.slice(39, 52));
    console.log(hands);

    db.Game.create({game_id: body.game_id, hands: hands});

    // Split deck into 2-4 hands of 13 cards
    // Assign player 0 (starter) to player with lowest card/previous winner (??)
    res.sendStatus(201);
    return;
});

// Join a game
app.post('/api/games/join', function(req, res) {
  res.sendStatus(201);
  return;
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})