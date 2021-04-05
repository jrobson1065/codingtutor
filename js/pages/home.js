import { logo } from "/js/components/logo-svg.js";

export const home = () => {
  $("main").build(logo);
  flipLetters();
  setInterval(flipLetters, 5000);
};

const flipLetters = () => {
  $$(".svg-logo span").each((el, i) => {
    i *= 50;
    setTimeout(() => {
      el.classList.add("flip");
    }, i);
    setTimeout(() => {
      el.classList.remove("flip");
    }, i + 3000);
  }, "pass");
};
