const puppeteer = require('puppeteer');

const sleep = x => new Promise(r => setTimeout(r, x));

let browser;
let page;

module.exports = function getLinkedinStats(login, password) {
  return new Promise(async (resolve, reject) => {
    try {
      browser = await puppeteer.launch({
        // headless: false,
      });
      page = await browser.newPage();
      page.goto('https://www.linkedin.com/login');

      page.on('response', async (response) => {
        if (response.url().includes('dashboard')) {
          const { data } = await response.json();
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
  }).then((getLinkedinStatsData) => {
    const ssiSelector = '.current-pie-grid .highcharts-title tspan';
    return new Promise(async (resolve, reject) => {
      try {
        await page.goto('https://www.linkedin.com/sales/ssi');
        await page.waitForSelector(ssiSelector);
        const ssi = await page.$eval(ssiSelector, el => +el.textContent);
        const industryRank = 100 - await page.$eval('.industry-ssi-rank .rank-change-main-number', el => +el.textContent);
        const networkRank = 100 - await page.$eval('.network-ssi-rank .rank-change-main-number', el => +el.textContent);

        resolve({
          ...getLinkedinStatsData,
          ssi,
          industryRank,
          networkRank,
        });
      } catch (e) {
        console.error('getLinkedinStats(ssi).error', e);
        reject(e);
      }
    });
  })
    .then((data) => {
      browser.close();
      return data;
    })
    .catch((error) => {
      browser.close();
      throw error;
    });
}