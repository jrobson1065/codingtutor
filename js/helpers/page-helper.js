import { home } from "/js/pages/home.js";
import { contact } from "/js/pages/contact.js"

export const initPage = page => {
    const init = pageMap[page];
    if (init != null) init();
}

const pageMap = {
    "contact": contact,
    "home": home,
}