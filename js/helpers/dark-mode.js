export const checkDarkMode = () => {
  const mode = getLocal("mode");
  return mode === "dark" ? true : false;
};

export const switchMode = () => {
  const mode = getLocal("mode");
  if (mode === "dark") setLocal("mode", "light");
  else setLocal("mode", "dark");
};

export const setToggleSwitch = () => {
  $(".switch input").checked = true;
};

export const toggleDarkMode = () => {
  $("html").toggle("dark");
};

export const initDarkMode = () => {
  document.ready(() => {
    if (checkDarkMode()) {
      toggleDarkMode();
      setToggleSwitch();
    }
    $(".switch input").click(toggleDarkMode, switchMode);
  });
};
