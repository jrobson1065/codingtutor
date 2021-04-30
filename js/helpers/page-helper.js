import { home } from "/js/pages/home.js";
import { contact } from "/js/pages/contact.js";
import { about } from "/js/pages/about.js";
import { example } from "../pages/example.js";

export const initPage = (page) => {
  const init = pageMap[page];
  if (page !== "home") $("nav").dataset.title = page.capitalize();
  if (init) init();
};

const pageMap = {
  home,
  contact,
  about,
  example,
};
