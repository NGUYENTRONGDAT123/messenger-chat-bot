const {queue} = require('./global')
const {queueTicket} = require('../helper')
//check DOM videos every 1s

async function subListenter(page) {
    setInterval(async () => {
        let [type, senderName, text, id] = await page.evaluate(() => {
            let type = 'text', senderName, text, id
            let subs = document.querySelectorAll("video")
            if(subs.length == 0){
                subs = document.querySelectorAll("div[role='none'][dir='auto']")
            } else {
                type = 'video'
            }
            let latest = subs[subs.length - 1]
            if(type=='video'){ //IF VIDEO
                let parent = latest.closest("div[role='gridcell']")
                if(subs.length != 0 && meta.video){
                    id = latest.nextElementSibling.getAttribute("data-instancekey")
                }
                let children = parent.querySelector("h4")
                if(children == null){
                    children = parent.querySelector("span")
                }
                senderName = children.textContent
    
            } else { //IF TEXT
                //query parents element from messages
                let parent = latest.closest("div[role='gridcell']")
                let children = parent.querySelector("h4")
                if(children == null){
                    children = parent.querySelector("span")
                }
                text = latest.textContent
                senderName = children.textContent
            }
            //if non-exsistant in queue, add to queue
            if(queueTicket()){
                queue.push({
                    type, senderName, text, id
                })
            } 
        })
    
        // if(senderName != "You sent" && senderName != null && !stat[nameID].includes(id)){
        //     stat[nameID].push(id)
        //     //send mock message
        //     // await page.click('p.kvgmc6g5.oygrvhab')
        //     // await page.keyboard.type(`${senderName} đã gửi ${stat[nameID].length} vid`)
        //     // await page.keyboard.press('Enter')
        // }
    }, 500)
}

module.exports = subListenter