const puppeteer = require("puppeteer");

exports.DCScrapper2 = async function (slugs) {
  const urls = slugs.map((slug) => `https://${slug}.gov.bd/`);

  let DCdata = [];

  for (const url of urls) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url, { timeout: 0 });

    const dcPageButton = ".service-box  a[title^='জেলা']";
    await page.waitForSelector(dcPageButton);

    await page.click(dcPageButton);

    const dcInfoCard = ".card-horizontal";
    await page.waitForSelector(dcInfoCard);

    const dcDetails = await page.$eval(dcInfoCard, (el) => {
      const dcImage = el.querySelector("img");
      const dcName = el.querySelector(".card-body h4.card-title");
      const details = Array.from(el.querySelector(".card-text").children).map(
        (item) => item.innerText
      );

      return {
        image: dcImage.src,
        name: dcName.innerText,
        details: details,
      };
    });

    // close the browser
    await browser.close();

    DCdata.push(dcDetails);
  }

  return DCdata;
};
