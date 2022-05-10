const MongoClient = require('mongodb').MongoClient;
const Mess = require('./util/Mess.js')
const initServer = require('./server/midware.js')
//MongoDB connection URL
const asia_mongo = `mongodb+srv://fanh:1909@cluster0.flrah.mongodb.net/jev?retryWrites=true&w=majority`;

//Mongo promise abstract
let initMongo = new Promise(resolve =>{
    MongoClient.connect(asia_mongo, (err, db) => {
        if (err) throw err;
        resolve(db)
    })
})

//init Mess Login and MongoDB connection
Promise.all([
    Mess.LogIn({
        cron: true,
        driveAPI: true,
        music: true,
        joke: true
    }),
    initMongo])
    .then((values) => {
        let db = values[1]
        let dbo = db.db("workout");

        //start Express server
        initServer(dbo)
    })
