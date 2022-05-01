const fs = require('fs')
function getRandomFile(folder) {
    return new Promise(resolve => {
        fs.readdir(folder, function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            } 
            //get a random number between a and b
            var random = Math.floor(Math.random() * files.length);
            resolve(files[random])
        });
    })
}
function sendMedia(file){
    
}
module.exports = {getRandomFile}