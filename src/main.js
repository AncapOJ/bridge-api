const express = require ('express');
const mongoose = require('mongoose');

const { defaults } = require('./_shared/utils');
const logging = require('./_shared/middleware/logging.middleware');
const secured = require('./_shared/middleware/secured.middleware');
const isAdmin= require('./_shared/middleware/admin.middleware');
const isPlayer= require('./_shared/middleware/player.middleware');
const BoardController = require('./boards/board.controller');
const GameController = require('./games/game.controller');
const UserController = require('./users/user.controller');

const app = express();

require('dotenv').config()
//Puerto
const PORT = defaults(process.env.PORT, 3000);

//Lectura del body
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//middleware de rutas
app.use(logging);

// BASE ERROR HANDLER
app.use((error, req, res, next) => {

    const exception = {
        status: defaults(error.status, 500),
        message: defaults(error.message, 'An unexpected error happened'),
    }

    if (process.env.NODE_ENV !== 'production') {
        exception['callstack'] = error.stack;
    }

    console.error(exception);
    res.status(exception.status).json(exception)
});

//Rutas
app.use('/games', GameController);
app.use('/boards', BoardController);
app.use('/users', UserController );



app.use('*', (req, res) => res.status(404).json("Path not existing"));


//Server y conexion mongodb
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        app.listen(PORT, () => console.info(`Server is running in http://localhost:${PORT}`))
    );