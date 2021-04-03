import { initDarkMode } from "/js/helpers/dark-mode.js";
import { loginNavHtml } from "/js/components/login-nav.js";

$("nav").build(loginNavHtml);
const page = $("title").className;

$(".nav-list ." + page).remove();

initDarkMode();