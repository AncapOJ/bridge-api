const express = require('express');

const secured = require('../_shared/middleware/secured.middleware');
const isAdmin= require('../_shared/middleware/admin.middleware');
const isPlayer= require('../_shared/middleware/player.middleware');
const GameService= require('./game.service')
const GameController = express.Router();

GameController.get('/',[secured,isAdmin], async (req, res, next) => {
    try {
        const { extended } = req.query;
        const game = await GameService.find(extended);
        res.json(game);
    } catch (error) {
        next(error)
    }
});

GameController.get('/player',[secured,isPlayer], async (req, res, next) => {
    try {
        const { extended } = req.query;
        console.log(req.user.username)
        const  user  = req.user;
        const game = await GameService.findPlayer(extended, user);
        res.json(game);
    } catch (error) {
        next(error)
    }
});

GameController.get('/:id', [secured,isAdmin],async (req, res, next) => {
    try {
        const { id } = req.params;

        const game = await GameService.findOne(id);

        res.json(game);
    } catch (error) {
        next(error);
    }
});

GameController.post('/',[secured,isAdmin], async (req, res, next) => {
    try {
        const { event, west, north, east, south, board , declarer, contract, result, score} = req.body;

        const created = await GameService.create({event, west, north, east, south, board, declarer, contract, result, score});

        res.status(201).json(created);
    } catch (error) {
        next(error);
    }
})

GameController.put('/:id',[secured,isAdmin], async (req, res, next) => {
    try {
        const { event, west, north, east, south, board , declarer, contract, result, score} = req.body;
        const { id } = req.params;

        const updated = await GameService.replace(id, {event, west, north, east, south, board, declarer, contract, result, score });

        res.json(updated);
    } catch (error) {
        next(error);
    }
})

GameController.delete('/:id',[secured,isAdmin], async (req, res, next) => {
    try {
        const { id } = req.params;

        await GameService.delete(id);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
})

module.exports = GameController;