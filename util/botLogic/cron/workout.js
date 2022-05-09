const cron = require('node-cron')
const {queueTicket, date} = require('../../helper.js')

let REST_DAY = false
let stat = {
    DAT: [],
    NGUYEN: [],
    PHANH: []
}

function report(page) {
    cron.schedule('0 0 22 * * *', async () => {
        // if(queueTicket()){
        //     console.log('queueing')
        // } else {
        //     console.log('no queueing')
        // }
        let report = `REPORT | ${date()}`
        for(name in stat){
            if(stat[name].length < 4){
                report += `\n${name}: thiếu video`
            }
        }
    })
}

module.exports = {report}