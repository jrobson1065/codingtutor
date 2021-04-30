export const about = () => {
  $("article h1").span("words");
  $$("article p").each((el) => {
    el.span("words");
  });
  const flip = flipLetters.bind(this, $$("article h1 span"), 80);
  flip();
  setInterval(flip, 5000);

  document.onmousemove = getDistance.bind(this, $("article"));

  $$("article span").each((el, i) => {
    document.on("mousemove", () => {
      const distance = getDistance(el);
      const i = randBetween(60, 100);
      if (distance < i + 6 && distance >= i) el.classList.add("highlight");
      else if (distance < 40) el.classList.add("highlight");
      else {
        el.classList.remove("highlight");
      }
    });
  });
};
