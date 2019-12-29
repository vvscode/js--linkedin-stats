const puppeteer = require('puppeteer');

const sleep = x => new Promise(r => setTimeout(r, x));

module.exports = async function getLinkedinStats(login, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({
        // headless: false,
      });
      const page = await browser.newPage();
      page.goto('https://www.linkedin.com/login');

      page.on('response', async (response) => {
        if (response.url().includes('dashboard')) {
          const { data } = await response.json();
          browser.close();
          resolve({
            numProfileViews: data.numProfileViews,
            numLastUpdateViews: data.numLastUpdateViews,
            numSearchAppearances: data.numSearchAppearances
          });
        }
      });

      await page.waitForSelector('input#username');
      await page.waitForSelector('input#password');
      await page.type('input#username', login);
      await page.type('input#password', password);
      await page.click('button[type=submit]');
      await page.waitForSelector('[data-control-name="identity_profile_photo"]');
      await page.click('[data-control-name="identity_profile_photo"]');
      await sleep(5000);
    } catch (e) {
      console.error('getLinkedinStats.error', e);
      reject(e);
    }
  });
}