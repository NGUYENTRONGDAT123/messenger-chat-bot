const cron = require('node-cron')
const fs = require('fs')
const {getRandomFile} = require('../util/dir')
let cron_greet = (page, option) => {
    let setup = {}
    //second / minute / hour / day of month / month / day of week
    if(option.morning){
        //8:00 AM
        cron.schedule('0 0 8 * *', async () => {
            //morning greet
            let file = await getRandomFile('../media/morning')

        })
    }
    if (option.evening) {
        cron.schedule('0 0 * * *', async () => {
            //night greet
    
        })
    }
}
