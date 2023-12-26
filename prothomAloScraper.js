const puppeteer = require("puppeteer");

exports.prothomAloScraper = async function (url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to Prothom Alo's website
  await page.goto("https://www.prothomalo.com/", {
    waitUntil: "domcontentloaded",
  });

  // Wait for the news articles to load
  await page.waitForSelector(".each");

  // Extract news articles
  const articles = await page.evaluate(() => {
    const articleElements = document.querySelectorAll(".each");
    const articlesData = [];

    articleElements.forEach((article) => {
      const title = article
        .querySelector("h2.title_holder a")
        .textContent.trim();
      const summary = article.querySelector(".summery").textContent.trim();
      const link = article.querySelector("h2.title_holder a").href;

      articlesData.push({
        title,
        summary,
        link,
      });
    });

    return articlesData;
  });

  console.log(articles);

  await browser.close();
};
