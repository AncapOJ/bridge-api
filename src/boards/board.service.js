const Board = require('./board.model')

class BoardService {

    static find() {
        const find = Board.find();
        return  find;
    }

    static async findOne(id) {
        const board = await Board.findById(id);

        if (board) {
            return board;
        }

        throw new StatusError(404, `Board with id <${id}> was not found`);
    }

    static async create(board) {

        // await CustomerResolver.existsById(board.owner);

        return Board.create(board);
    }

    static async replace(id, board) {
        const updated = await Board.findByIdAndUpdate(id, board);

        if (updated) {
            return updated;
        }

        throw new StatusError(404, `Board with id <${id}> was not found`);
    }

    static async delete(id) {
        const board = await Board.findById(id);

        if (board) {
            return Board.findByIdAndRemove(id);
        }

        throw new StatusError(404, `Board with id <${id}> was not found`);
    }
}

module.exports = BoardService;