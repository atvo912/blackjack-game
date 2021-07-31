const express = require('express');

const db = require('./db');
const app = express();

const port = 3000;

app.use(express.json());

function modifyResult(result): any {
  // let resultModified:any = {};
  // let properties = Object.keys(result['_doc']);
  // for (let i = 0; i < properties.length; i++) {
  //   let key = properties[i];
  //   resultModified[key] = result[key];
  // }
  // let resultModified = Object.assign({}, result['_doc']);
  let resultModified = JSON.parse(JSON.stringify(result['_doc']));

  if (resultModified.started) {
    resultModified.hands[0][1] = 'hidden';
    resultModified.deck = [];
  }

  return resultModified;
}

function evaluateHand(hand: string[]): number[] {
  const tenCards = ['10', 'J', 'Q', 'K'];
  let aceCount = 0;
  let staticCount = 0;
  let output: number[] = [];

  for (let i = 0; i < hand.length; i++) {
    let card: string = hand[i];
    let cardRank: string = card.slice(0, -1);
    if (tenCards.includes(cardRank)) {
      let cardValue = 10;
      staticCount += cardValue;
    } else if (cardRank === 'A') {
      let cardValue = 1;
      staticCount += cardValue;
      aceCount++;
    } else {
      let cardValue = Number(cardRank);
      staticCount += cardValue;
    }
  }

  output.push(staticCount);

  for (let i = 0; i < aceCount; i++) {
    // we have already added +1 for each ace
    // for each ace, we just need to add +10 to account for that possibility
    staticCount += 10;
    output.push(staticCount);
  }

  console.log(staticCount, aceCount);
  return output;
}

// Get current gamestate
// Req must provide gameId and playerId
app.get('/api/games/state', function(req, res) {
    // let gamestate = {game_id: "TAI#604", started: false, hands: [[ 'J♦', 'Q♥' ], [ '8♥', '3♦' ], [ 'Q♣', 'Q♦' ], [ '2♦', 'A♥' ]], players: ['me', 'you'], current_turn: 0};
    let game_id = req.header('game_id');

    // We may want to check to see if the user_id corresponds to someone in the game
    let user_id = req.header('user_id');

    db.Game.findOne({game_id: game_id})
    .then((result) => {
      if (!result) {
        throw result;
      }
      // We don't want to send the dealer's hidden card, or the deck contents to the client
      // let resultModified = result;
      // if (result.started) {
      //   resultModified.hands[0][1] = 'hidden';
      //   resultModified.deck = [];
      // }
      let resultModified:any = modifyResult(result);
      console.log(result);
      res.json(resultModified);

    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(404);
    })
    return;
});

// Play a move
app.put('/api/games/move', function(req, res) {
    // moves are 'hit' and 'stand'
    let {game_id, user_id, move} = req.body;
    console.log(game_id, user_id, move);

    db.Game.findOne({game_id: game_id})
    .then((result) => {
      let {current_turn, players, deck, hands} = result;
      let isTheirTurn = user_id === players[current_turn].user_id;
      let isValidMove = move === 'hit' || move === 'stand';
      console.log('isTheirTurn:', isTheirTurn);
      console.log('isValidMove:', isValidMove);

      if (isTheirTurn && isValidMove) {
        if (move === 'hit') {
          // pop the deck
          // update the player's hand & the deck
          let drawnCard = deck.pop();
          console.log(drawnCard);
          let handIndex = current_turn + 1;
          hands[handIndex].push(drawnCard);

          // we should evaluate their hand for a bust after each hit
          let possibleValues = evaluateHand(hands[handIndex]);
          console.log(possibleValues);
          let hasBusted = true;

          for (let i = 0; i < possibleValues.length; i++) {
            if (possibleValues[i] <= 21) {
              hasBusted = false;
            }
          }

          // if they have busted, their turn is over and they have lost
          // otherwise, then we simply update deck/hands & let them move again
          if (hasBusted) {
            return db.Game.findOneAndUpdate({game_id: game_id}, {$set: {deck: deck, hands: hands}, $inc: {current_turn: 1}}, {new: true})
            .then(() => {
              return db.Game.findOneAndUpdate({'players.user_id': user_id}, {$inc: {'players.$.losses': 1}}, {new: true});
            })
          } else {
            return db.Game.findOneAndUpdate({game_id: game_id}, {$set: {deck: deck, hands: hands}}, {new: true});
          }
        } else {
          // if move === 'stand', just increment current_turn
          return db.Game.findOneAndUpdate({game_id: game_id}, {$inc: {current_turn: 1}}, {new: true})
          // do we do something different after the last player in rotation?
        }
        // res.sendStatus(200);
      } else {
        throw new Error('Invalid request');
      }
    })
    .then((result) => {
      // has everyone taken their turn?
      let {hands} = result;
      if (result.current_turn <= result.players.length - 1) {
        return result;
      } else {
        // automate the dealer plays
        // evaluate W/L for players who didn't already go bust
        // set up for new game?
        console.log('DEALER GOES NOW');
        // evaluate dealer hand
        console.log(result);

        // let possibleValues = evaluateHand(hands[0]);
        // // if dealer's hand >= 17, stand
        // if (possibleValues[-1] >= 17) {
        //   // stand
        // } else {
        //   // if dealer's hand <= 16, hit
        // }

        return result;
      }
    })
    .then((result) => {
      if (!result) {
        throw result;
      }
      // let resultModified = result;
      // // let resultModified = extend({}, result);
      // resultModified.hands[0][1] = 'hidden';
      // resultModified.deck = [];
      let resultModified:any = modifyResult(result);
      console.log(result);
      res.json(resultModified);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send('Invalid request');
    })

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
    let playerNames:string[] = result.players.map((playerObj) => playerObj['user_id']);
    let isPlayerNew = !playerNames.includes(user_id);

    let newPlayer = new db.User({user_id: user_id});

    if (hasNotStarted && hasRoom && isPlayerNew) {
      console.log('player should be added');
      return db.Game.findOneAndUpdate({game_id: game_id}, {$push: {players: newPlayer}}, {new: true});
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
  let {game_id} = req.body;

  // Our post request needs to have a gameId on it
  // We need to verify the gameId exists and hasn't started already
  db.Game.findOne({game_id: game_id})
  .then((result) => {
    console.log(result);
    if (!result.started) {
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
      let numPlayers:number = result.players.length + 1;
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
      return db.Game.findOneAndUpdate({game_id: game_id}, {'$set': {started: true, hands: hands, current_turn: 0, deck: deck}}, {new: true});
    } else {
      console.error('Game already started');
      throw new Error('Game already started');
    }
  })
  .then((result) => {
    // res.sendStatus(200);
    // let resultModified = result;
    // let resultModified:any = {};
    // let properties = Object.keys(result['_doc']);
    // for (let i = 0; i < properties.length; i++) {
    //   let key = properties[i];
    //   resultModified[key] = result[key];
    // }

    // resultModified.hands[0][1] = 'hidden';
    // resultModified.deck = [];
    let resultModified:any = modifyResult(result);

    console.log('result', result);
    res.json(resultModified);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(400);
  })

  return;
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})