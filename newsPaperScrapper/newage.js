const puppeteer = require("puppeteer");

exports.newage = async function (url) {
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

  const leadContent = await page.waitForSelector(".contentPartOne");

  // Extract news articles
  const articles = await page.evaluate((leadContent) => {
    // grab first heading
    const articlesData = [];

    function getNews(node) {
      const title = node.querySelector("a").innerText.trim();
      const link = node.querySelector("a").href;
      const imgSrc = node.querySelector("img")?.src;
      // const excerpt = node.querySelector("p")?.innerText.trim();
      // const time = node.querySelector("time")?.innerText.trim();

      return {
        title,
        link,
        imgSrc,
        // excerpt,
        // time,
      };
    }

    articlesData.push(getNews(leadContent.querySelector(".homeSlide")));
    articlesData.push(
      ...Array.from(leadContent.querySelectorAll(".homeSlideNews ul li")).map(
        (node) => getNews(node)
      )
    );
    articlesData.push(
      ...Array.from(
        leadContent.querySelectorAll(".homeSlideNewsMid ul li:not(:last-child)")
      ).map((node) => getNews(node))
    );

    return articlesData;
  }, leadContent);

  await browser.close();
  return articles;
};
