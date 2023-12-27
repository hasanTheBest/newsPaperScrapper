const puppeteer = require("puppeteer");
// const { getNews } = require("./utilities/utilities");

exports.samakal = async function (url) {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    headless: false,
  });
  const page = await browser.newPage();

  // Navigate to Prothom Alo's website
  await page.goto(url, {
    waitUntil: "domcontentloaded",
  });

  // Wait for the news articles to load
  const DTopNewsSection = await page.waitForSelector(".DTopNewsSection");

  // Extract news articles
  const articles = await page.evaluate((DTopNewsSection) => {
    // grab first heading
    const articlesData = [];
    const selectors = [];

    function getNews(node) {
      const link = node.querySelector("a").href;
      const title = node.querySelector("h3")
        ? node.querySelector("h3").innerText.trim()
        : node.querySelector("h1").innerText.trim();

      const excerpt = node.querySelector("p")?.innerText.trim();
      const time = node.querySelector(".PublishTime")?.innerText.trim();
      const imgSrc = node.querySelector("img")?.src;

      return {
        title,
        link,
        excerpt,
        time,
        imgSrc,
      };
    }

    articlesData.push(getNews(DTopNewsSection.querySelector(".DHomeTopLead")));

    selectors.push(
      DTopNewsSection.querySelectorAll(".DHomeLeadList3"),
      DTopNewsSection.querySelectorAll(".leadTop3-wrap")
    );

    selectors.forEach((selector) => {
      const news = Array.from(selector).map((node) => getNews(node));
      articlesData.push(...news);
    });

    return articlesData;
  }, DTopNewsSection);

  await browser.close();
  return articles;
};
