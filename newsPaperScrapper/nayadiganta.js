const puppeteer = require("puppeteer");
// const { getNews } = require("./utilities/utilities");

exports.nayaDiganta = async function (url) {
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
  await page.waitForSelector(".news-box");

  // Extract news articles
  const articles = await page.evaluate(() => {
    // grab first heading
    const articlesData = [];
    const selectors = [];

    function getNews(node) {
      const link = node.querySelector("a").href;
      const title = node.querySelector("h2").innerText.trim();

      // const excerpt = node.querySelector("p.excerpt")?.textContent.trim();
      // const time = node.querySelector("time")?.textContent.trim();
      // const imgSrc = node.querySelector("img")?.src;

      return {
        title,
        link,
        // excerpt,
        // time,
        // imgSrc,
      };
    }

    articlesData.push(getNews(document.querySelector(".news-caption-lead")));

    selectors.push(
      document.querySelectorAll(".news-box .col-md-9 .col-md-8 .news-caption"),
      document.querySelectorAll(".lead-news-row .news-item")
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
