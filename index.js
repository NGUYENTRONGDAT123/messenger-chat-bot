const MongoClient = require('mongodb').MongoClient;
const Mess = require('./util/Mess.js')
const initServer = require('../server/midware.js')
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
Promise.all([Mess.LogIn({
        cron: true,
        driveAPI: true,
        music: true,
        joke: true
    }),
    initMongo]).then((values) => {
    let db = values[1]
    let dbo = db.db("workout");

    //init Express Server
    app.use(require('express-status-monitor')());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(cors({
        origin: [origin_site, 'http://localhost:5000']
    }));
    app.listen(PORT, () => {
        console.log(`server running on port: ${PORT}`);
    });
})
