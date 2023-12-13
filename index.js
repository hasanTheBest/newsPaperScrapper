// const startScrapping = require("./DCInfo");
// const puppeteer = require("puppeteer");
const fsPromises = require("fs/promises");
const { DCScrapper2 } = require("./DCScrapper2");

const url = "https://sirajganj.gov.bd/";

async function main() {
  const browser = await puppeteer.launch({ headless: "new" });

  // create a page
  const page = await browser.newPage();

  // go to a specific page
  await page.goto(url, { timeout: 0 });

  // await for element to appear
  const dcPageButton = ".service-box  a[title^='জেলা']";

  // await page.waitForSelector(".service-box  a[title='জেলা প্রশাসক ']");
  await page.waitForSelector(dcPageButton);

  //document.querySelector("#left > div.blocks > div:nth-child(7) > div:nth-child(1) > div > ul > li:nth-child(1) > a")

  // Now click to the element
  await page.click(dcPageButton);

  // Now execute new function
  const dcInfoCard = ".card-horizontal";
  await page.waitForSelector(dcInfoCard);

  const dcDetails = await page.$eval(dcInfoCard, (el) => {
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

  console.dir(dcDetails);

  // close the browser
  await browser.close();
}

// main();

const divRaj = [
  "sirajganj",
  "pabna",
  "rajshahi",
  "natore",
  "joypurhat",
  "chapainawabganj",
  "naogaon",
];

// async function start(divRaj) {
//   const result = await startScrapping(divRaj);

//   console.dir(result);

//   fsPromises.writeFile("dc.json", JSON.stringify(result));
// }

// start(divRaj);

// console.log("dc data", DCScrapper2(divRaj));

async function start(divRaj) {
  const result = await DCScrapper2(divRaj);

  fsPromises.writeFile("/dc.json", JSON.stringify(result));
}

start(divRaj);
