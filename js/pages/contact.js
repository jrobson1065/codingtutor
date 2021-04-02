import {
    checkDarkMode,
    setToggleSwitch,
    switchMode,
    toggleDarkMode,
  } from "/js/helpers/dark-mode.js";
  import { loginNavHtml } from "/js/components/login-nav.js";
  
  $("nav").build(loginNavHtml);
  
  $("li.contact").remove();
  
  const darkModeElements = [$("html"), $(".switch"), $("main")];
  
  const toggleDarkElements = () => toggleDarkMode(darkModeElements);
  
  if (checkDarkMode()) {
    document.ready(toggleDarkElements, setToggleSwitch);
  }
  
  $(".switch input").click(toggleDarkElements, switchMode);
  