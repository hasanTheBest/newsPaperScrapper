const puppeteer = require("puppeteer");

exports.scrapDCInfo = async function (url) {
  // const browser = await puppeteer.launch({ headless: false });
  const browser = await puppeteer.launch({ headless: "new" });

  // create a page
  const page = await browser.newPage();

  // go to a specific page
  await page.goto(url, { timeout: 0 });

  // await for element to appear
  await page.waitForSelector(".service-box  a[title='জেলা প্রশাসক ']");

  // Now click to the element
  await page.click(".service-box  a[title='জেলা প্রশাসক ']");

  // Now execute new function
  await page.waitForSelector(".card-horizontal");
  const dcDetails = await page.$eval(".card-horizontal", (el) => {
    const dcImage = el.querySelector("img");
    const dcName = el.querySelector(".card-body h4.card-title");
    const dcBatch = el.querySelector(".card-text p:nth-child(1)");
    const dcMobile = el.querySelector(".card-text p:nth-child(4)");
    const dcJoinAt = el.querySelector(".card-text p:nth-child(5)");

    return {
      imageSrc: dcImage.src,
      name: dcName.innerText,
      batch: dcBatch.innerText,
      mobile: dcMobile.innerText,
      joining: dcJoinAt.innerText,
    };
  });

  // close the browser
  await browser.close();

  return dcDetails;
};
