const fsPromises = require("fs/promises");
const { prothomAlo } = require("./newsPaperScrapper/prothomAlo");
const { nayaDiganta } = require("./newsPaperScrapper/nayadiganta");
const { samakal } = require("./newsPaperScrapper/samakal");
const { jugantor } = require("./newsPaperScrapper/jugantor");
const { inqilab } = require("./newsPaperScrapper/inqilab");
const { kalerkantha } = require("./newsPaperScrapper/kalerkantha");
const { janakantha } = require("./newsPaperScrapper/janakantha");
const { manabzamin } = require("./newsPaperScrapper/manabzamin");
const { jaijaidin } = require("./newsPaperScrapper/jaijaidin");
const { songbad } = require("./newsPaperScrapper/songbad");
const { amadersomoy } = require("./newsPaperScrapper/amadershomoy");
const { bhorerkagoj } = require("./newsPaperScrapper/bhorerkagoj");
const { bonikbarta } = require("./newsPaperScrapper/bonikbarta");

async function start(url) {
  const result = await bonikbarta(url);

  fsPromises.writeFile("bonikbarta.json", JSON.stringify(result));
}

start("https://bonikbarta.net/");
// start("https://www.bhorerkagoj.com/");
// start("https://www.dainikamadershomoy.com/");
// start("https://sangbad.net.bd/");
// start("https://www.jaijaidinbd.com/");
// start("https://mzamin.com/");
// start("https://www.dailyjanakantha.com/");
// start("https://www.kalerkantho.com/");
// start("https://dailyinqilab.com/");
// start("https://www.jugantor.com/");
// start("https://samakal.com/");
// start("https://www.dailynayadiganta.com/");
// start("https://www.prothomalo.com/");
