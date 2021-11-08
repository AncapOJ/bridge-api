const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const board = {
    board: {type: Number},
    vulnerable: {type: String},
    dealer: {type:String},
    deal: {
        west: {type:String},
        north: {type: String},
        east: {type: String},
        south: {type:String}
    },
};



const boardSchema = new Schema(board, { timestamps: true });

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;