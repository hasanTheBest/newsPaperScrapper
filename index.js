const puppeteer = require("puppeteer");

const url = "https://natore.gov.bd/";
// const url = "https://en.wikipedia.org/wiki/Main_Page";

async function main() {
  // launch browser
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

  console.log("dcDetails", dcDetails);

  // targeted dom
  // const dcPage = await page.waitForSelector(
  //   ".service-box  a[title='জেলা প্রশাসক ']"
  // );

  // const dcPage = await page.$(".service-box  a[title='জেলা প্রশাসক ']");

  // console.log("dc page", dcPage);

  // click the link
  // await dcPage.click();

  // targeted dom
  // const dcImage = await page.waitForSelector(".card-horizontal img");
  // const dcName = await page.waitForSelector(".card-body h4.card-title");
  // const dcBatch = await page.waitForSelector(".card-text p:nth-child(1)");
  // const dcMobile = await page.waitForSelector(".card-text p:nth-child(4)");
  // const dcJoinAt = await page.waitForSelector(".card-text p:nth-child(5)");

  // const dcDetails = {
  //   imageSrc: dcImage.src,
  //   name: dcName.innerText,
  //   batch: dcBatch.innerText,
  //   mobile: dcMobile.innerText,
  //   joining: dcJoinAt.innerText,
  // };

  // console.log("dc details", dcDetails);

  // close the browser
  await browser.close();

  console.log("main function is running.");
}

main();
