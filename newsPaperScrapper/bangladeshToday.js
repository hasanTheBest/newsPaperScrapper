const puppeteer = require("puppeteer");

exports.bangladeshToday = async function (url) {
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

  const leadContent = await page.waitForSelector(".leadBox");

  // Extract news articles
  const articles = await page.evaluate((leadContent) => {
    // grab first heading
    const articlesData = [];

    function getNews(node) {
      const title = node.querySelector("h3").innerText.trim();
      const link = node.querySelector("a").href;
      const imgSrc = node.querySelector("img")?.src;
      const excerpt = node.querySelector("p")?.innerText.trim();
      // const time = node.querySelector("time")?.innerText.trim();

      return {
        title,
        link,
        imgSrc,
        excerpt,
        // time,
      };
    }

    articlesData.push(getNews(leadContent.querySelector(".mainLead")));

    articlesData.push(
      ...Array.from(
        leadContent.firstElementChild.firstElementChild.lastElementChild.querySelectorAll(
          ".single-block"
        )
      ).map((node) => getNews(node))
    );

    return articlesData;
  }, leadContent);

  await browser.close();
  return articles;
};
