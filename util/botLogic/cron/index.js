const {report} = require('./workout.js')

function cron(page) {
    report(page)
}

module.exports = cron


