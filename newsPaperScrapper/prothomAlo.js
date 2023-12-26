const puppeteer = require("puppeteer");
// const { getNews } = require("./utilities/utilities");

exports.prothomAlo = async function (url) {
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
  await page.waitForSelector(".qn-x0");

  // Extract news articles
  const articles = await page.evaluate((getNews) => {
    // grab first heading
    const articlesData = [];
    const selectors = [];

    function getNews(node) {
      const link = node.querySelector("a").href;
      const title = node.querySelector(".headline-title").textContent.trim();

      const excerpt = node.querySelector("p.excerpt")?.textContent.trim();
      const time = node.querySelector("time")?.textContent.trim();
      const imgSrc = node.querySelector("img")?.src;

      return {
        title,
        excerpt,
        link,
        time,
        imgSrc,
      };
    }

    articlesData.push(getNews(document.querySelector(".qn-x0 .BXtd8")));

    selectors.push(
      document.querySelectorAll(".qn-x0 .DnfWn"),
      document.querySelectorAll(".aGkwG .left_image_right_news")
    );

    selectors.forEach((selector) => {
      const news = Array.from(selector).map((node) => getNews(node));
      articlesData.push(news);
    });

    return articlesData;
  });

  await browser.close();
  return articles;
};
