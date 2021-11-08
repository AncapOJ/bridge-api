const express = require('express'); 
const UserService = require('./user.service');
const UserController = express.Router();

UserController.get('/', async (req, res, next) => {
    try {
        const { extended } = req.query;
        const user = await UserService.find(extended);
        res.json(user);
    } catch (error) {
        next(error)
    }
});

UserController.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await UserService.findOne(id);

        res.json(user);
    } catch (error) {
        next(error);
    }
});

UserController.post('/', async (req, res, next) => {
    try {
        const { username, email, password ,role} = req.body;

        const created = await UserService.create({  username, email, password ,role });

        res.status(201).json(created);
    } catch (error) {
        next(error);
    }
})

UserController.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const created = await UserService.login({ email, password });
        //imprimimos el token
        res.status(201).json(created);
    } catch (error) {
        next(error);
    }
})

UserController.put('/:id', async (req, res, next) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const updated = await UserService.replace(id, { name });

        res.json(updated);
    } catch (error) {
        next(error);
    }
})

UserController.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        await UserService.delete(id);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
})

module.exports = UserController;