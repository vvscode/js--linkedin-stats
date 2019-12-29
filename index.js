const saveData = require('./utils/safe-to-google-spreadsheet');
const getStats = require('./utils/linkedin-get-stats');

(async () => {
  try {
    const stats = await getStats('xxxx', 'yyy');
    await saveData(
      new Date(),
      stats.numProfileViews,
      stats.numLastUpdateViews,
      stats.numSearchAppearances,
    );
    console.log('Done', stats);
  } catch (e) {
    console.error('Error: ', e);
    throw e;
  }
})();