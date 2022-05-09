const {queue} = require('../global')
const video = require('./video')
const message = require('./message')

function subAct(){
    setInterval( async () => {
        if(queue.length == 0){
            return
        }
        let sub = queue[0]
        if(type=='video'){
            video(sub)
        } else {
            message(sub)
        }
        if(text.includes("@Vu") && senderName!="You sent" && State.pending==false){
            State.pending = true
            await page.click('p.kvgmc6g5.oygrvhab')
            let reply = "OK"
            await page.keyboard.type(`Hello ${senderName}, ${reply}`, {delay: 25})
            await page.waitForTimeout(25)
            await page.keyboard.press('Enter')
            State.pending = false
        } else {
            console.log(`${senderName} : ${text} : ${State.pending}\nNo call found`)
        }
    }, 600)
}

module.export = subAct