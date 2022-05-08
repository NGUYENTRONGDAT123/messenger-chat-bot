const response = require('./response.js')
const emotional = require('./emotional.js')

async function talk() {
    // page.
    await new Promise(resolve => setTimeout(resolve, 1000))
    talk()
}

module.exports = talk