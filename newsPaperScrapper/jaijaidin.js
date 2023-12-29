const puppeteer = require("puppeteer");

exports.jaijaidin = async function (url) {
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
  const leadArea = await page.waitForSelector(".lead-content");

  // Extract news articles
  const articles = await page.evaluate((leadArea) => {
    // grab first heading
    const articlesData = [];
    const selectors = [
      Array.from(leadArea.nextElementSibling.children),
      Array.from(
        document.querySelectorAll(
          "._container-fluid + div.row .common-lead-content"
        )
      ),
    ];

    function getNews(node) {
      const link = node.querySelector("a").href;
      const title = node.querySelector(".title").innerText.trim();
      const imgSrc = node.querySelector("img")?.src;
      const excerpt = node.querySelector(".summery")?.innerText.trim();

      // const time = node.querySelector(".PublishTime")?.innerText.trim();

      return {
        title,
        link,
        imgSrc,
        excerpt,
        // time,
      };
    }

    articlesData.push(getNews(leadArea));

    selectors.forEach((selector) =>
      articlesData.push(...selector.map((node) => getNews(node)))
    );

    return articlesData;
  }, leadArea);

  await browser.close();
  return articles;
};
