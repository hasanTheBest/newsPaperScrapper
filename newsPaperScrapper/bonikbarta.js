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

  await page.goto(url, {
    waitUntil: "domcontentloaded",
  });

  await page.waitForSelector(".lead_exclusive");

  // Extract news articles
  const articles = await page.evaluate(() => {
    // grab first heading
    const articlesData = [];

    function getNews(node) {
      const link = node.querySelector("a").href;
      const title = node.querySelector("h4").innerText.trim();
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
        document.querySelector(".lead_exclusive").parentElement.children
      ).map((node) => getNews(node))
    );

    return articlesData;
  });

  await browser.close();
  return articles;
};
