import { home } from "/js/pages/home.js";
import { contact } from "/js/pages/contact.js"
import { about } from "/js/pages/about.js";

export const initPage = page => {
    const init = pageMap[page];
    if (init != null) init();
}

const pageMap = {
    "contact": contact,
    "home": home,
    "about": about,
}