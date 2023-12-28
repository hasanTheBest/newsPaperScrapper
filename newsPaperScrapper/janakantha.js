const puppeteer = require("puppeteer");

exports.janakantha = async function (url) {
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
  const leadArea = await page.waitForSelector(".TopHomeSection");


  // Extract news articles
  const articles = await page.evaluate(
    (leadArea) => {
      // grab first heading
      const articlesData = [];
      const selectors = [
        Array.from(
          leadArea.querySelector(".DLeadSide").children
        ),
        Array.from(
          leadArea.querySelector(".DTop2").firstElementChild.children
        ),
        Array.from(document.querySelector(".DTop4").children)

      ]

      function getNews(node) {
        const link = node.querySelector("a").href;
        const title = node.querySelector("h1")
          ? node.querySelector("h1").innerText.trim()
          : node.querySelector("h2").innerText.trim();
        const imgSrc = node.querySelector("img")?.src;
        const excerpt = node.querySelector("p")?.innerText.trim();

        // const time = node.querySelector(".PublishTime")?.innerText.trim();

        return {
          title,
          link,
          imgSrc,
          excerpt,
          // time,
        };
      }

      articlesData.push(getNews(leadArea.querySelector(".DLeadNews")));

      selectors.forEach(seletor => articlesData.push(...seletor.map(node => getNews(node))))


      return articlesData;
    },
    leadArea
  );

  await browser.close();
  return articles;
};

