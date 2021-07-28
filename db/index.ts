const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/thirteen', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('Error connecting to MongoDB', console.error.bind(console, 'connection error'));
mongoose.connection.once('open', function() {
  console.log('Connected to MongoDB!');
});

let moveSchema = new mongoose.Schema({
  move_type: {type: String, required: true},
  cards_played: {type: Array, required: true},
  played_by: {type: Number, required: true}
});
let Move = mongoose.model('Move', moveSchema);

let userSchema = new mongoose.Schema({
  user_id: {type: String, required: true, unique: true}
});
let User = mongoose.model('User', userSchema);

let gameSchema = new mongoose.Schema({
  game_id: {type: String, required: true, unique: true},
  hands: {type: Array, required: true},
  lastMove: {type: moveSchema},
  players: [userSchema]
});
let Game = mongoose.model('Game', gameSchema);

// let testMove = new Move({move_type: 'single', cards_played: ['3♠'], played_by: 0});
// let testUser = new User({user_id: 'atvo913'});
// let testGame = new Game({game_id: 'tai#69', hands: [['4♠'], ['5♠'], ['6♠'], ['7♠']], lastMove: testMove});
// testGame.players.push(testUser);

// testUser.save();
// testGame.save();

module.exports.Move = Move;
module.exports.User = User;
module.exports.Game = Game;