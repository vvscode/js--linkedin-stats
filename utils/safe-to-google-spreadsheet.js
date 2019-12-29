const util = require('util');

const GoogleSpreadsheet = require('google-spreadsheet');

const creds = require('../linkedin-stater-credentials.json');
const spredSheetId = '***REMOVED***';

module.exports = async function saveData(date, whoViewedYourProfile, postViews, searchAppearence) {
  const doc = new GoogleSpreadsheet(spredSheetId);

  await util.promisify(doc.useServiceAccountAuth)(creds);
  const info = await util.promisify(doc.getInfo)();
  const sheet = info.worksheets[0];
  const rows = await util.promisify(sheet.getRows)({ limit: 9999 });

  const strDate = date.toLocaleDateString()

  await util.promisify(sheet.addRow)({
    date: strDate,
    whoviewedyourprofile: whoViewedYourProfile,
    postviews: postViews,
    searchappearence: searchAppearence,
  });
}