const puppeteer = require("puppeteer");

exports.amadersomoy = async function (url) {
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
  const leadArea = await page.waitForSelector(".tc-tabs-content .sub-content");

  // Extract news articles
  const articles = await page.evaluate((leadArea) => {
    // grab first heading
    const articlesData = [];
    const selectors = [
      Array.from(
        leadArea.querySelectorAll(".tc-post-list-style2 > .row > div")
      ),
      Array.from(leadArea.lastElementChild.children), // starter div with all child div
    ];

    function getNews(node) {
      const link = node.querySelector("a").href;
      const title = node.querySelector(".lead-title")
        ? node.querySelector(".lead-title").innerText.trim()
        : node.querySelector(".title").innerText.trim();
      const imgSrc = node.querySelector("img")?.src;
      const excerpt = node.querySelector(".intro")?.innerText.trim();

      // const time = node.querySelector(".PublishTime")?.innerText.trim();

      return {
        title,
        link,
        imgSrc,
        excerpt,
        // time,
      };
    }

    articlesData.push(getNews(leadArea.firstElementChild.firstElementChild));

    selectors.forEach((selector) =>
      articlesData.push(...selector.map((node) => getNews(node)))
    );

    return articlesData;
  }, leadArea);

  await browser.close();
  return articles;
};
