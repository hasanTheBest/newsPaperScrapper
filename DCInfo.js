const { scrapDCInfo } = require("./DCScrapper");

module.exports = function startScrapping(divRaj) {
  const divRajUrl = divRaj.map((dist) => `https://${dist}.gov.bd/`);

  const divRajDC = divRajUrl.map(async (url) => {
    const DCInfo = await scrapDCInfo(url);

    return {
      url: url,
      DC: DCInfo,
    };
  });

  return divRajDC;
};
