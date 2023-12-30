const puppeteer = require("puppeteer");

exports.businessStandard = async function (url) {
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

  const leadContent = await page.waitForSelector(".pane-top-news-v4");

  // Extract news articles
  const articles = await page.evaluate((leadContent) => {
    function getNews(node) {
      const title = node.querySelector("h2")
        ? node.querySelector("h2").innerText.trim()
        : node.querySelector("h3").innerText.trim();
      const link = node.querySelector("a").href;
      const imgSrc = node.querySelector("img")?.src;
      const excerpt = node.querySelector("p.card-intro")?.innerText.trim();
      const time = node.querySelector(".date")?.innerText.trim();

      return {
        title,
        link,
        imgSrc,
        excerpt,
        time,
      };
    }

    const newsBoxes = [
      leadContent.querySelector(".strip-bg-offwhite"),
      ...Array.from(
        leadContent.querySelectorAll(".strip-bg-white .medium-4.small-12")
      ),
      ...Array.from(
        leadContent.querySelectorAll(".without-image.medium-3 .mb-5.p-top-15")
      ),
    ];

    const articlesData = newsBoxes.map((news) => getNews(news));

    return articlesData;
  }, leadContent);

  await browser.close();
  return articles;
};
