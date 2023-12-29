const puppeteer = require("puppeteer");

exports.bonikbarta = async function (url) {
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
  const leadArea = await page.waitForSelector(".wrapper");

  // Extract news articles
  const articles = await page.evaluate((leadArea) => {
    // grab first heading
    const articlesData = [];

    function getNews(node) {
      const link = node.querySelector("a").href;
      const title = node.querySelector("h2")
        ? node.querySelector("h2").innerText.trim()
        : node.querySelector("h4").innerText.trim();
      const imgSrc = node.querySelector("img")?.src;
      // const excerpt = node.querySelector(".intro")?.innerText.trim();

      // const time = node.querySelector(".PublishTime")?.innerText.trim();

      return {
        title,
        link,
        imgSrc,
        // excerpt,
        // time,
      };
    }

    articlesData.push(
      ...Array.from(
        leadArea.querySelector(".lead_exclusive").parentElement.children
      ).map((node) => getNews(node))
    );

    return articlesData;
  }, leadArea);

  await browser.close();
  return articles;
};
