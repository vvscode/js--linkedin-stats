const saveData = require('./utils/safe-to-google-spreadsheet');


(async () => {
  try {
    saveData(
      new Date(),
      1111,
      2222,
      3333
    );
  } catch (e) {
    console.error('Error: ', e);
    throw e;
  }
})();