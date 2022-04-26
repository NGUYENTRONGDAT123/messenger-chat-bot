const puppeteer = require('puppeteer');

let USERNAME = 'phananhchsbun@gmail.com'
let PASSWORD = 'tran19092000'

let Util = {
    LogMess : async () => {
        const browser = await puppeteer.launch({headless: false, args: [
            "--disable-notifications"
        ]});
        const page = await browser.newPage();
        // await page.authenticate({'username':'checker', 'password': 'checker'});
        await page.goto('https://www.facebook.com/messages/t/100007409469662');
        await page.waitForSelector('#email');
        await page.waitForTimeout(200)
        await page.click('#email')
        await page.type('#email', USERNAME)
        await page.waitForTimeout(50)
        await page.type('#pass', PASSWORD)
        await page.waitForTimeout(100)
        await page.keyboard.press('Enter')
    },
    getUserInfo : async () => {
        let [username, userID] = await page.evaluate(() => {
            let div = document.querySelectorAll("div[role='none'][dir='auto']")
            let latest = div[div.length - 1]
            //query parents element from messages
            let parent = latest.closest("div[role='gridcell']")
            let children = parent.querySelector("h4")
            let text = latest.textContent
            let senderName = children.textContent
            return [text, senderName]
        })
        
    }
}

