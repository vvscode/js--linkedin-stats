const util = require('util');

const GoogleSpreadsheet = require('google-spreadsheet');

const config = require('../config');

module.exports = async function saveData(date, data) {
  const doc = new GoogleSpreadsheet(config.spredSheetId);

  await util.promisify(doc.useServiceAccountAuth)(config.googleAppAuth);
  const info = await util.promisify(doc.getInfo)();
  const sheet = info.worksheets[0];

  const strDate = date.toLocaleDateString()

  const row = await util.promisify(sheet.addRow)({
    date: strDate,
    ...data
  });
}