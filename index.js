const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const Mess = require('./util/Mess.js')
puppeteer.use(StealthPlugin())

let State = {
    pending: false,
	queue: []
};
//global page object
// let page
(async () => {
	await Mess.LogIn({
		cron: true,
		driveAPI: true,
		music: true,
		joke: true
	})
})();
