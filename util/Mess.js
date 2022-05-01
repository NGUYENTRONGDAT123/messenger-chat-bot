const puppeteer = require('puppeteer');
const {cron, driveAPI, music, joke} = require('../util/botLogic')

let MESS_PA = `https://www.facebook.com/messages/t/100007409469662`;
let GROUP_CHAT = 'https://www.facebook.com/messages/t/4946971555356821';
let LONG_PHON = "https://www.facebook.com/messages/t/2345111842273989";

let USERNAME = 'phananhchsbun@gmail.com'
let PASSWORD = 'tran19092000'

const Mess = {
    page: null,
    async LogIn(option){
        const browser = await puppeteer.launch({headless: false, args: [
            "--disable-notifications"
        ]});
        const page = await browser.newPage();
        await page.goto(CHAT);
        await page.waitForSelector('#email');
        await page.waitForTimeout(200)
        await page.click('#email')
        await page.type('#email', USERNAME)
        await page.waitForTimeout(50)
        await page.type('#pass', PASSWORD)
        await page.waitForTimeout(100)
        await page.keyboard.press('Enter')
        //Bot functions settings
        if(option.cron)     await cron(page, option)
        if(option.driveAPI) await driveAPI(page, option)
        if(option.music)    await music(page, option)
        if(option.joke)     await joke(page, option)
        this.page = page
        return this.page 
    },
    async getUserInfo(){
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

