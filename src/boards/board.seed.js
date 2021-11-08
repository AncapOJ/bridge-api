const mongoose= require('mongoose');
const Board = require('./board.model')

require('dotenv').config();

const boards=[
    {
        board:1,
        vulnerable:"None",
        dealer:"N",
        deal:{
            north: "QJT85.9.J.J87652",
            west: "A.A642.T9432.AK9",
            south: "K932.KJ75.AQ65.T",
            east: "764.QT83.K87.Q43"
        }
    },
    {
        board:2,
        vulnerable:"NS",
        dealer:"E",
        deal:{
            north: "873.Q83.AQT3.K52",
            west: "KQ964.AT.97652.T",
            south: "JT52.K52.8.AQJ84",
            east: "A.J9764.KJ4.9763"
        }
    },
    {
        board:3,
        vulnerable:"EW",
        dealer:"S",
        deal:{
            north: "Q6.QJ93.KJT964.5",
            west: "A93.T5.A32.JT986",
            south: "KT84.842.Q7.AK43",
            east: "J752.AK76.85.Q72"
        }
    },
    {
        board:4,
        vulnerable:"All",
        dealer:"W",
        deal:{
            north: "AJ32.QT32.J98.AQ",
            west: "T4.A5.KT653.J853",
            south: "K985.96.AQ2.K764",
            east: "Q76.KJ874.74.T92"
        }
    },
    {
        board:5,
        vulnerable:"NS",
        dealer:"N",
        deal:{
            north: "J.T74.QJT762.J54",
            west: "Q97432.K2.K95.62",
            south: "K65.AQ3.A3.AKQ98",
            east: "AT8.J9865.84.T73"
        }
    },
    {
        board:6,
        vulnerable:"EW",
        dealer:"E",
        deal:{
            north: "87643.KJ7.T2.QJ2",
            west: "QT2.54.K5.KT9876",
            south: "K95.Q2.AQ983.A43",
            east: "AJ.AT9863.J764.5"
        }
    }
]

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
        // Utilizando Movie.find() obtendremos un array con todos las pelis de la db
    const allBoards = await Board.find();
        // Si existen peliculas previamente, dropearemos la colección
    if (allBoards.length) {
      await Board.collection.drop(); //La función drop borra la colección
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
        // Una vez vaciada la db de las pelis, usaremos el array movies
        // para llenar nuestra base de datos con todas las pelis.
        await Board.insertMany(boards);
    })
  .catch((err) => console.log(`Error creating data: ${err}`))
    // Por último nos desconectaremos de la DB.
  .finally(() => mongoose.disconnect());
