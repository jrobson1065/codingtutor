import { initDarkMode } from "/js/helpers/dark-mode.js";
import { loginNavHtml } from "/js/components/login-nav.js";

$("nav").build(loginNavHtml);

$("li.home").remove();

initDarkMode();

console.log(initDarkMode)

const toggleDarkLogo = () => {
  if ($("body").classList.contains("dark"))
    $(".logo").src = "./images/logo-dark.png";
  else $(".logo").src = "./images/logo-light.png";
};
