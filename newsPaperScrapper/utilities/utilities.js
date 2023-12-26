exports.getNews = function (node) {
  const link = node.querySelector("a").href;
  const title = node.querySelector(".headline-title").textContent.trim();

  const excerpt = node.querySelector("p.excerpt")?.textContent.trim();
  const time = node.querySelector("time")?.textContent.trim();
  const imgSrc = node.querySelector("img")?.src;

  return {
    title,
    excerpt,
    link,
    time,
    imgSrc,
  };
};
