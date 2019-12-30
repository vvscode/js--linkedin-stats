const util = require('util');

const GoogleSpreadsheet = require('google-spreadsheet');

const creds = require('../linkedin-stater-credentials.json');
const spredSheetId = '***REMOVED***';

module.exports = async function saveData(date, data) {
  const doc = new GoogleSpreadsheet(spredSheetId);

  await util.promisify(doc.useServiceAccountAuth)(creds);
  const info = await util.promisify(doc.getInfo)();
  const sheet = info.worksheets[0];

  const strDate = date.toLocaleDateString()

  const row = await util.promisify(sheet.addRow)({
    date: strDate,
    ...data
  });
}