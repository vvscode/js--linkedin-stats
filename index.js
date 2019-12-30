const saveData = require('./utils/safe-to-google-spreadsheet');
const getStats = require('./utils/linkedin-get-stats');

(async () => {
  try {
    const stats = await getStats('xxxx', 'yyy');
    await saveData(
      new Date(),
      {
        whoviewedyourprofile: stats.numProfileViews,
        postviews: stats.numLastUpdateViews,
        searchappearence: stats.numSearchAppearances,
        ssi: stats.ssi,
        industryrank: stats.industryRank,
        networkrank: stats.networkRank
      }
    );
    console.log('Done', {
      date: new Date(),
      ...stats
    });
  } catch (e) {
    console.error('Error: ', e);
    throw e;
  }
})();