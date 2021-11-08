
const mongoose= require('mongoose');
const Game = require('./game.model')

require('dotenv').config();

const games= [ 
    {
        event:"BBO1-2019WBTC",
        west: "NAB",
        north:"BURAS",
        east:"B DRIJVER",
        south: "NARKIEWICZ",
        board: "6189298d55e6f965bde9c918",
        declarer:"N",
        contract:"4SX",
        result:10,
        score:"NS 590"
    },
    {
        event:"BBO1-2019WBTC",
        west: "NAB",
        north:"BURAS",
        east:"B DRIJVER",
        south: "NARKIEWICZ",
        board: "6189298d55e6f965bde9c919",
        declarer:"W",
        contract:"3DX",
        result:9,
        score:"NS -470"
    },
    {
        event:"BBO1-2019WBTC",
        west: "NAB",
        north:"BURAS",
        east:"B DRIJVER",
        south: "NARKIEWICZ",
        board: "6189298d55e6f965bde9c91a",
        declarer:"S",
        contract:"2D",
        result:8,
        score:"NS 90"
    },
    {
        event:"BBO1-2019WBTC",
        west: "NAB",
        north:"BURAS",
        east:"B DRIJVER",
        south: "NARKIEWICZ",
        board:  "6189298d55e6f965bde9c91b",
        declarer:"N",
        contract:"4S",
        result:9,
        score:"NS -100"
    },
    {
        event:"BBO1-2019WBTC",
        west: "NAB",
        north:"BURAS",
        east:"B DRIJVER",
        south: "NARKIEWICZ",
        board: "6189298d55e6f965bde9c91c",
        declarer:"S",
        contract:"3NT",
        result: 6,
        score:"NS -300"
    },
    {
        event:"BBO1-2019WBTC",
        west: "NAB",
        north:"BURAS",
        east:"B DRIJVER",
        south: "NARKIEWICZ",
        board: "6189298d55e6f965bde9c91d",
        declarer:"N",
        contract:"2S",
        result:7,
        score:"NS -50"
    },

]

mongoose
.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
      
  const allGame = await Game.find();
      
  if (allGame.length) {
    await Game.collection.drop(); 
  }
})
.catch((err) => console.log(`Error deleting data: ${err}`))
.then(async () => {
      // Una vez vaciada la db de las pelis, usaremos el array movies
      // para llenar nuestra base de datos con todas las pelis.
      await Game.insertMany(games);
  })
.catch((err) => console.log(`Error creating data: ${err}`))
  // Por último nos desconectaremos de la DB.
.finally(() => mongoose.disconnect());