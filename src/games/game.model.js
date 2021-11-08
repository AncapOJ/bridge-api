const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const game = {
    event: {type: String, required: true},
    west: {type:String},
    north: {type: String},
    east: {type: String},
    south: {type:String},
    board: {type: mongoose.Types.ObjectId, ref: 'Board', required: true},
    declarer: {type: String},
    contract: {type:String},
    result: {type: Number},
    score: {type: String}
};

const gameSchema = new Schema(game, { timestamps: true });

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;