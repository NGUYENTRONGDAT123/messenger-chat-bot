
	setInterval( async() => {
            let [text, senderName] = await page.evaluate(async() => {
                let div = document.querySelectorAll("div[role='none'][dir='auto']")
                let latest = div[div.length - 1]
                //query parents element from messages
                let parent = latest.closest("div[role='gridcell']")
                let children = parent.querySelector("h4")
                if(children == null){
                    children = parent.querySelector("span")
                }
                let text = latest.textContent
                let senderName = children.textContent
                return [text, senderName]
            })
            if(text.includes("@Vu") && senderName!="You sent" && State.pending==false){
                State.pending = true
                let parsedText = text.split(" ")
                await page.click('p.kvgmc6g5.oygrvhab')

                let reply = "OK"
                await page.keyboard.type(`Hello ${senderName}, ${reply}`, {delay: 25})
                await page.waitForTimeout(25)
                await page.keyboard.press('Enter')
                State.pending = false
            } else {
                console.log(`${senderName} : ${text} : ${State.pending}\nNo call found`)
            }
         }, 1000)