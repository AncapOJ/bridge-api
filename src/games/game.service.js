const Game = require('./game.model')

class GameService {

    static find(extended) {
        const find = Game.find();
        return extended ? find.populate('board') : find;
    }

    static findPlayer(extended,user) {
        const find=Game.find({$or:[{west:user.username},{north:user.username},{south:user.username},{east:user.username}]})
        return extended ? find.populate('board') : find;
    }

    static async findOne(id) {
        const game = await Game.findById(id);

        if (game) {
            return game;
        }

        throw new StatusError(404, `Game with id <${id}> was not found`);
    }

    static async create(game) {

        // await CustomerResolver.existsById(game.owner);

        return Game.create(game);
    }

    static async replace(id, game) {
        const updated = await Game.findByIdAndUpdate(id, game);

        if (updated) {
            return updated;
        }

        throw new StatusError(404, `Game with id <${id}> was not found`);
    }

    static async delete(id) {
        const game = await Game.findById(id);

        if (game) {
            return Game.findByIdAndRemove(id);
        }

        throw new StatusError(404, `Game with id <${id}> was not found`);
    }
}

module.exports = GameService;