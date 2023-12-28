const puppeteer = require("puppeteer");
// const { getNews } = require("./utilities/utilities");

exports.jugantor2 = async function (url) {
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
  const leadArea = await page.waitForSelector("#lead-news");

  const leadNews = leadArea.querySelector("#desktop-cat-lead");
  const leadNewsAside = Array.from(
    leadArea.firstElementChild.firstElementChild.lastElementChild
      .firstElementChild.children
  );
  const leadNewsBottom = Array.from($("#show-news").children);

  // Extract news articles
  const articles = await page.evaluate(
    (leadNews, leadNewsAside, leadNewsBottom) => {
      // grab first heading
      const articlesData = [];

      function getNews(node) {
        const link = node.querySelector("a").href;
        const title = node.querySelector("h2")
          ? node.querySelector("h2").innerText.trim()
          : node.querySelector("figcaption").innerText.trim();
        const imgSrc = node.querySelector("img")?.src;

        // const excerpt = node.querySelector("p")?.innerText.trim();
        // const time = node.querySelector(".PublishTime")?.innerText.trim();

        return {
          title,
          link,
          imgSrc,
          // excerpt,
          // time,
        };
      }

      // articlesData.push(getNews(document.querySelector("#desktop-cat-lead")));
      articlesData.push(getNews(leadNews));
      articlesData.push(
        ...JSON.parse(leadNewsAside).map((node) => getNews(node))
      );
      articlesData.push(
        ...JSON.parse(leadNewsBottom).map((node) => getNews(node))
      );

      // articlesData.push(
      //   ...Array.from(document.querySelectorAll("#show-news > .col")).map((node) =>
      //     getNews(node)
      //   )
      // );

      return articlesData;
    },
    leadNews,
    JSON.stringify(leadNewsAside),
    JSON.stringify(leadNewsBottom)
  );

  await browser.close();
  return articles;
};

exports.jugantor = async function (url) {
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
  const leadArea = await page.waitForSelector("#lead-news");


  // Extract news articles
  const articles = await page.evaluate(
    (leadArea) => {
      // grab first heading
      const articlesData = [];
      const selectors = [
        Array.from(
          leadArea.firstElementChild.firstElementChild.lastElementChild
            .firstElementChild.children
        ),
        Array.from(document.querySelector("#show-news").children)

      ]

      function getNews(node) {
        const link = node.querySelector("a").href;
        const title = node.querySelector("h2")
          ? node.querySelector("h2").innerText.trim()
          : node.querySelector("figcaption").innerText.trim();
        const imgSrc = node.querySelector("img")?.src;

        // const excerpt = node.querySelector("p")?.innerText.trim();
        // const time = node.querySelector(".PublishTime")?.innerText.trim();

        return {
          title,
          link,
          imgSrc,
          // excerpt,
          // time,
        };
      }

      articlesData.push(getNews(document.querySelector("#lead-news #desktop-cat-lead")));

      selectors.forEach(seletor => articlesData.push(...seletor.map(node => getNews(node))))


      return articlesData;
    },
    leadArea
  );

  await browser.close();
  return articles;
};

