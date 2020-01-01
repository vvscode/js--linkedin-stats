const saveData = require('./utils/safe-to-google-spreadsheet');
const getStats = require('./utils/linkedin-get-stats');
const config = require('./config');

(async () => {
  try {
    const stats = await getStats(config.linkedin.login, config.linkedin.password);
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