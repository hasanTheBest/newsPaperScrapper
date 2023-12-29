const puppeteer = require("puppeteer");

exports.thedailystar = async function (url) {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: "domcontentloaded",
  });

  await page.waitForSelector(".pane-home-top-v5");

  // Extract news articles
  const articles = await page.evaluate(() => {
    // grab first heading
    const articlesData = [];

    function getNews(node) {
      const link = node.querySelector("a").href;
      const title = node.querySelector(".title").innerText.trim();
      const imgSrc = node.querySelector("img")?.srcset;
      const excerpt = node.querySelector(".intro")?.innerText.trim();
      const time = node.querySelector(".interval")?.innerText.trim();

      return {
        title,
        link,
        imgSrc,
        excerpt,
        time,
      };
    }

    articlesData.push(
      ...Array.from(document.querySelectorAll(".pane-home-top-v5 .card")).map(
        (node) => getNews(node)
      )
    );

    return articlesData;
  });

  await browser.close();
  return articles;
};
