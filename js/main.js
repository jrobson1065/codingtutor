import { initDarkMode } from "/js/helpers/dark-mode.js";
import { loginNavHtml } from "/js/components/login-nav.js";
import { initPage } from "/js/helpers/page-helper.js";
import { footer } from "/js/components/footer.js";

$("nav").build(loginNavHtml);
$("footer").build(footer);
const page = $("title").className;

$(".nav-list ." + page).remove();

initDarkMode();

initPage(page)

// To check git code line count:
// git ls-files | while read f; do git blame --line-porcelain $f | grep '^author '; done | sort -f | uniq -ic | sort -n
