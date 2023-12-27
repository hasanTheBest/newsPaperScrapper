const puppeteer = require("puppeteer");
// const { getNews } = require("./utilities/utilities");

exports.inqilab = async function (url) {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    headless: false,
  });

  const page = await browser.newPage();

  // Navigate the url website
  await page.goto(url, {
    waitUntil: "domcontentloaded",
  });

  // Wait for the news articles to load
  const leadArea = await page.waitForSelector(".special-top");

  // Extract news articles
  const articles = await page.evaluate((leadArea) => {
    // grab first heading
    const articlesData = [];

    function getNews(node) {
      const link = node.querySelector("a").href;
      const title = node.querySelector("h3")
        ? node.querySelector("h3").innerText.trim()
        : node.querySelector("a p").innerText.trim();

      const excerpt = node.querySelector("p")?.innerText.trim();
      const time = node.querySelector("span")?.innerText.trim();
      const imgSrc = node.querySelector("img")?.src;

      return {
        title,
        link,
        excerpt,
        time,
        imgSrc,
      };
    }

    articlesData.push(getNews(leadArea.firstElementChild));

    articlesData.push(
      ...Array.from(leadArea.children[1].children).map((node) => getNews(node))
    );

    return articlesData;
  }, leadArea);

  await browser.close();
  return articles;
};
