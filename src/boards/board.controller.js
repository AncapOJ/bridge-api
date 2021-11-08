const express = require('express')
const BoardService= require('./board.service')
const BoardController = express.Router();

BoardController.get('/', async (req, res, next) => {
    try {
        
        const board = await BoardService.find();
        res.json(board);
    } catch (error) {
        next(error)
    }
});

BoardController.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const board = await BoardService.findOne(id);

        res.json(board);
    } catch (error) {
        next(error);
    } 
});

BoardController.post('/', async (req, res, next) => {
    try {
        
        const newBoard ={
            board: req.body.board,
            vulnerable: req.body.vulnerable,
            dealer: req.body.dealer,
            deal:{
                north: req.body.deal.north,
                west: req.body.deal.west,
                south: req.body.deal.south,
                east: req.body.deal.east,
            }
        }

        const created = await BoardService.create(newBoard);
 
        res.status(201).json(created);
    } catch (error) {
        next(error);
    }
})

BoardController.put('/:id', async (req, res, next) => {
    try {
        const { board, vulnerable, dealer, deal } = req.body;
        const { id } = req.params;

        const updated = await BoardService.replace(id, {board, vulnerable, dealer, deal });

        res.json(updated);
    } catch (error) {
        next(error);
    }
})

BoardController.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        await BoardService.delete(id);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
})

module.exports = BoardController;