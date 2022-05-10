const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');

//init Express Server
function initServer(){
    app.use(require('express-status-monitor')());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(cors({
        origin: ['http://localhost:5000']
    }));
    app.listen(PORT, () => {
        console.log(`server running on port: ${PORT}`);
    });
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    })
}
module.exports = initServer;