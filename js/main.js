import { initDarkMode } from "/js/helpers/dark-mode.js";
import { loginNavHtml } from "/js/components/login-nav.js";
import { initPage } from "/js/helpers/page-helper.js";
import { footer } from "/js/components/footer.js";
import { checkCodeTime, clearData } from "/js/pages/contact.js";

$("nav").build(loginNavHtml);
$("footer").build(footer);
const page = $("title").className;

$(".nav-list ." + page).remove();

initDarkMode();

initPage(page);

checkCodeTime();
clearData();
