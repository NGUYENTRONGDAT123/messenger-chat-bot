const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const {getRandomFile} = require('./util/dir.js');
const {Sheet, Drive} = require('./util/botLogic/driveAPI/drive.js');
puppeteer.use(StealthPlugin())

let State = {
    pending: false
} 
(async () => {

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
	  if(text.includes("@Vu") && senderName!="You sent" && State.pending==false){
		State.pending = true
		let parsedText = text.split(" ")
		await page.click('p.kvgmc6g5.oygrvhab')
		let reply = ''
		if(parsedText[2]){
			reply+= parsedText[2]
		}
		if(parsedText[1]=="ROAST"){
			reply += " NGU"
		}
		if(parsedText[1]=="NEW_SHEET"){
			let id = await Drive.make.file('sheet', `${senderName}'s File`, "1CCeL88RZsywmd9FVY46Hx3G7S5FK707y")
			let link = `https://docs.google.com/spreadsheets/d/${id}/edit#gid=0`
			//update permission
			await Drive.update.permision()
			await page.keyboard.type(link, {delay: 0})
			await page.keyboard.press('Enter')
		}
		if(parsedText[1]=="SEND_MUSIC"){
			const [fileChooser] = await Promise.all([
				page.waitForFileChooser(),
				(async() => {
					await page.evaluate(()=>document.querySelector("div[aria-label='Attach a file']").click())
				})()	
			]);
			await fileChooser.accept(['media/lauv.mp3']);
		}
		if(parsedText[1]=="GREET"){
			let file = await getRandomFile('media/xinh_dep')
			const [fileChooser] = await Promise.all([
				page.waitForFileChooser(),
				(async() => {
					await page.evaluate(()=>document.querySelector("div[aria-label='Attach a file']").click())
				})()	
			]);
			await fileChooser.accept([`media/xinh_dep/${file}`]);
		}
		// await page.keyboard.type(`Hello ${senderName}, ${reply}`, {delay: 25})
		// await page.waitForTimeout(25)
		// await page.keyboard.press('Enter')
		State.pending = false
	} else {
		console.log(`${senderName} : ${text} : ${State.pending}\nNo call found`)
	}
  }, 1000)
})();