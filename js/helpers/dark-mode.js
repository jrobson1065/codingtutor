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
  initSwitch();
  document.ready(() => {
    if (checkDarkMode()) {
      toggleDarkMode();
      setToggleSwitch();
    }
    $(".switch input").click(toggleDarkMode, switchMode);
  });
};

const initSwitch = () => {
  $(".switch").on(
    "keypress",
    (e) => {
      const i = $(".switch input");
      if (e.code === "Space" || e.code === "Enter") {
        i.checked ? (i.checked = false) : (i.checked = true);
        toggleDarkMode();
      }
    },
    "call"
  );
};