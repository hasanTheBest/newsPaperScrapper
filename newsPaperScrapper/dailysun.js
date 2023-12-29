const puppeteer = require("puppeteer");

exports.dailysun = async function (url) {
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

  const leadContent = await page.waitForSelector("section .container .row");

  // Extract news articles
  const articles = await page.evaluate((leadContent) => {
    // grab first heading
    const articlesData = [];

    function getNews(node) {
      let title;
      const link =
        node.tagName === "A" ? node.href : node.querySelector("a").href;
      const imgSrc = node.querySelector("img")?.srcset;
      const excerpt = node.querySelector("p")?.innerText.trim();
      const time = node.querySelector("time")?.innerText.trim();

      if (node.querySelector("h1"))
        title = node.querySelector("h1").innerText.trim();
      else if (node.querySelector("h2"))
        title = node.querySelector("h2").innerText.trim();
      else title = node.querySelector("h5").innerText.trim();

      return {
        title,
        link,
        imgSrc,
        excerpt,
        time,
      };
    }

    articlesData.push(
      getNews(leadContent.querySelector(".leadArea_timeLineLead__hBWyl"))
    );
    articlesData.push(
      ...Array.from(
        leadContent.querySelectorAll(".leadArea_leadMoreList__Zj4XU")
      ).map((node) => getNews(node))
    );
    articlesData.push(
      getNews(leadContent.querySelector(".leadArea_focus_news__TgrND"))
    );

    return articlesData;
  }, leadContent);

  await browser.close();
  return articles;
};
