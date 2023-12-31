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
const { thedailystar } = require("./newsPaperScrapper/thedailystar");
const { dailysun } = require("./newsPaperScrapper/dailysun");
const { newage } = require("./newsPaperScrapper/newage");
const { newnation } = require("./newsPaperScrapper/newnation");
const { bangladeshToday } = require("./newsPaperScrapper/bangladeshToday");
const { dailyObserver } = require("./newsPaperScrapper/dailyObserver");
const { businessStandard } = require("./newsPaperScrapper/businessStandard");
const { dhakaTribune } = require("./newsPaperScrapper/dhakaTribune");
const { ittefaq } = require("./newsPaperScrapper/ittefaq");

async function start(url) {
  const result = await ittefaq(url);

  fsPromises.writeFile("ittefaq.json", JSON.stringify(result));
}

start("https://www.ittefaq.com.bd/");
// start("https://www.dhakatribune.com/");
// start("https://www.tbsnews.net/");
// start("https://www.observerbd.com/");
// start("https://thebangladeshtoday.com/");
// start("https://newnation.live/");
// start("https://www.newagebd.net/");
// start("https://www.daily-sun.com/");
// start("https://www.thedailystar.net/");
// start("https://bonikbarta.net/");
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
