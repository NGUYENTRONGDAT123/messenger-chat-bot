const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

let State = {
    pending: false
} 
let MESS_PA = `https://www.facebook.com/messages/t/100007409469662`;
let GROUP_CHAT = 'https://www.facebook.com/messages/t/4946971555356821';
let LONG_PHON = "https://www.facebook.com/messages/t/2345111842273989";
(async () => {
  const browser = await puppeteer.launch({headless: true, args: [
    "--disable-notifications"
  ]});
  const page = await browser.newPage();
  // await page.authenticate({'username':'checker', 'password': 'checker'});
  await page.goto(LONG_PHON);
  await page.waitForSelector('#email');
  await page.waitForTimeout(200)
  await page.click('#email')
  await page.type('#email', 'phananhchssbun@gmail.com', {delay: 20})
  await page.waitForTimeout(400)
  await page.click('#pass')
  await page.type('#pass', 'tran19092000', {delay: 30})
  await page.waitForTimeout(100)
  await page.keyboard.press('Enter')
  // const [button] = await page.$x("//button[contains(., 'Log In')]");
  // if (button) {
  //   await button.click();
  // } 
  await page.waitForSelector('p.kvgmc6g5.oygrvhab', {visible: true});
  await page.click('p.kvgmc6g5.oygrvhab')
  // await page.keyboard.type('Hello from Puppeteer _ 11:20!', {delay: 30})
  // await page.waitForTimeout(100)
  // await page.keyboard.press('Enter')
  setInterval( async() => {
    //   let messsages = await page.evaluate(() => Array.from(document.querySelectorAll("div[role='none'][dir='auto']"), element => element.textContent));
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
	  let parsedText = text.split(" ")
	if(text.includes("@Vu") && senderName!="You sent" && State.pending==false){
		State.pending = true
		await page.click('p.kvgmc6g5.oygrvhab')
		let reply = ''
		if(parsedText[2]){
			reply+= parsedText[2]
		}
		if(parsedText[1]=="ROAST"){
			reply += " NGU"
		}
		await page.keyboard.type(`Hello ${senderName}, ${reply}`, {delay: 25})
		await page.waitForTimeout(50)
		await page.keyboard.press('Enter')
		State.pending = false
	} else {
		console.log(`${senderName} : ${text} : ${State.pending}\nNo call found`)
	}
  }, 1500)
})();