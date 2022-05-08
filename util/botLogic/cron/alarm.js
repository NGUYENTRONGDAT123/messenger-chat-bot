const {getRandomFile} = require('../../dir')
let cron_greet = (option) => {
    let setup = {}
    //second / minute / hour / day of month / month / day of week
    if(option.morning){
        //8:00 AM
        cron.schedule('0 0 8 * * *', async () => {
            //morning greet
            let file = await getRandomFile('../media/morning')
            
        })
    }
    if (option.evening) {
        cron.schedule('0 0 * * * *', async () => {
            //night greet
    
        })
    }
}

module.exports = {cron_greet}
