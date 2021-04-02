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
  console.log("called");
  $("html").toggle("dark");
  switchMode();
};

export const initDarkMode = () => {
  document.ready(() => {
    if (checkDarkMode()) toggleDarkMode();
    $(".switch input").click(toggleDarkMode);
  });
};
