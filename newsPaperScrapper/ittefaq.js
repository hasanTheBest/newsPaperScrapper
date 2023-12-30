const puppeteer = require("puppeteer");

exports.ittefaq = async function (url) {
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

  const leadContent = await page.waitForSelector(".wrapper.special_30_70");

  // Extract news articles
  const articles = await page.evaluate((leadContent) => {
    function getNews(node) {
      const title = node.querySelector(".title").innerText.trim();
      const link = node.querySelector("a").href;
      const imgSrc = node.querySelector("img")?.src;
      const excerpt = node.querySelector(".summery")?.innerText.trim();
      // const time = node.querySelector(".date")?.innerText.trim();

      return {
        title,
        link,
        imgSrc,
        excerpt,
        // time,
      };
    }

    const newsBoxes = [
      ...Array.from(leadContent.querySelectorAll(".each")),
      ...Array.from(
        document.querySelector(".p_d.brash").querySelectorAll(".col4")
      ),
      ...Array.from(
        document.querySelector(".hide_this_mobile").querySelectorAll(".col3")
      ),
    ];

    const articlesData = newsBoxes.map((news) => getNews(news));

    return articlesData;
  }, leadContent);

  await browser.close();
  return articles;
};
