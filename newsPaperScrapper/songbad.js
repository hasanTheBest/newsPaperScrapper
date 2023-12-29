const puppeteer = require("puppeteer");

exports.songbad = async function (url) {
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
  const leadArea = await page.waitForSelector(".lead-section");

  // Extract news articles
  const articles = await page.evaluate((leadArea) => {
    // grab first heading
    const articlesData = [];
    const selectors = [
      Array.from(leadArea.querySelectorAll(".lead-bottom dd")),
      Array.from(leadArea.querySelectorAll(".side-box dd")),
    ];

    function getNews(node) {
      const link = node.querySelector("a").href;
      const title = node.querySelector("a").innerText.trim();
      const imgSrc = node.querySelector("img")?.src;
      const excerpt = node.querySelector("p")?.innerText.trim();

      // const time = node.querySelector(".PublishTime")?.innerText.trim();

      return {
        title,
        link,
        imgSrc,
        excerpt,
        // time,
      };
    }

    articlesData.push(getNews(leadArea.querySelector(".lead-top")));

    selectors.forEach((selector) =>
      articlesData.push(...selector.map((node) => getNews(node)))
    );

    return articlesData;
  }, leadArea);

  await browser.close();
  return articles;
};
