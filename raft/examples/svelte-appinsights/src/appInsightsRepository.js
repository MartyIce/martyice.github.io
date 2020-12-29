class AppInsightsRepository {
    Execute(aiId, aiKey, query) {
        const url =  `https://api.applicationinsights.io/v1/apps/${aiId}/query?query=${encodeURI(query)}`
        console.log(aiId);
        console.log(aiKey);
        console.log(query);
        return fetch(url, {
            headers: {
              'x-api-key': aiKey
            }
          });
    }
}

module.exports = AppInsightsRepository