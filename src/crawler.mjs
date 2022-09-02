import puppeteer from 'puppeteer';

const TOS_ACCEPT_BTN = '#onetrust-accept-btn-handler';
const LOGIN_BTN = '.frontHero button.loginButton';
const SIGN_IN_FRAME = [
	'iframe[name="__tcfapiLocator"]',
	'iframe[src="https://example.com"]',
];
const USER_INPUT = '#sign_in_up_email';
const SIGN_IN_SUBMIT_BTN = '#sign_in_up_submit';

export async function downloadPlaylists() {
	const browser = await puppeteer.launch({
		headless: false,
		slowMo: 40,
	});
	const page = await browser.newPage();
	await page.goto('https://soundcloud.com');
	await page.waitForSelector(TOS_ACCEPT_BTN);
	await page.click(TOS_ACCEPT_BTN);
	await page.click(LOGIN_BTN);

	const elementHandle = await page.$(SIGN_IN_FRAME[0]);
	const frame = await elementHandle.contentFrame();

	// const elementHandle2 = await frame.$(SIGN_IN_FRAME[1]);
	// const frame2 = await elementHandle2.contentFrame();

	// await frame2.waitForSelector(USER_INPUT);
	// console.log("found!");
	// await page.waitForNetworkIdle(2);
	// console.log("typing...");
	// await page.type(USER_INPUT, "zeachco@gmail.com");

	// await page.click(SIGN_IN_SUBMIT_BTN);
	// onetrust-accept-btn-handler
	// await page.screenshot({ path: "example.png" });
	// await page.click(".login");

	// await browser.close();
}
