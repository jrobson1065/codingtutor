import {
    checkDarkMode,
    setToggleSwitch,
    switchMode,
    toggleDarkMode,
  } from "/js/helpers/dark-mode.js";
  import { loginNavHtml } from "/js/components/login-nav.js";
  
  $("nav").build(loginNavHtml);
  
  $("li.example").remove();
  
  const darkModeElements = [$("html"), $(".switch")];
  
  const toggleDarkElements = () => toggleDarkMode(darkModeElements);
  
  if (checkDarkMode()) {
    document.ready(toggleDarkElements, setToggleSwitch);
  }
  
  $(".switch input").click(toggleDarkElements, switchMode);
  