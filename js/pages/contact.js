import { sendEmail, initEmail } from "/js/services/emailjs.js";

let timerRunning = false;

const acceptableKeys = [
  "Backspace",
  "Tab",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Shift",
];

export const contact = () => {
  initEmail();
  if (getLocal("block") === "true") blockContact();
  checkUnblock();
  $("#name").preventPaste();
  $$(".field span").each(validateField, "pass");
  $(".send").click(activateConfirmation);
  $(".popup").click(hidePopup);
  validateField($(".code"));
  validateField($(".email-verification"));
  $(".validate").click(verifyCode);
  $(".resend").click(resendCode);
  $$("[contenteditable]").each((el) => el.on("paste", cleanPaste), "pass");
};

const nameValidator = (el) => {
  el.on("keydown", (e) => {
    if (e.key.in(acceptableKeys)) return;
    if (!e.metaKey) {
      e.preventDefault();
      const text = el.innerText;
      const lastChar = text[text.length - 1];
      if (text.length >= 30) {
        el.shake();
        return;
      }
      if (
        (lastChar === space && e.key === " ") ||
        (text.length === 0 && (e.key === " " || e.key === "'")) ||
        (lastChar === "'" && e.key === "'")
      ) {
        el.shake();
        return;
      }
      if (
        (e.key.in(allLetters) && e.key.length === 1) ||
        e.code === "Space" ||
        e.key === "'"
      ) {
        let key = e.key;
        if (text.length === 0 || lastChar === space) key = e.key.toUpperCase();
        insertTextAtCursor(key);
      } else {
        el.shake();
        return;
      }
    }
  });

  el.on("keyup", () => {
    let text = el.innerText;
    if (text.match(/\./)) {
      text = text.replace(".", "");
      el.clearText();
      insertTextAtCursor(text);
      return;
    }
  });

  el.on("blur keydown", () => {
    if (el.innerText.length === 0) markInvalid(el);
    else markValid(el);
    checkFormValid();
  });
};

const emailValidator = (el) => {
  el.on("keydown", (e) => {
    const text = el.innerText;
    const lastChar = text[text.length - 1];
    if (e.key.in(acceptableKeys)) return;
    if (!e.metaKey) {
      e.preventDefault();
      if (
        (text.length === 0 && !e.key.in([...nums, ...allLetters])) ||
        e.code === "Space" ||
        (e.key === lastChar && lastChar === ".") ||
        (e.key === "@" && text.match(/@/)) ||
        e.key.length > 1
      ) {
        if (e.key.length === 1) el.shake();
        return;
      } else {
        const key = e.key.toLowerCase();
        insertTextAtCursor(key);
      }
    }
  });

  el.on("blur keydown", () => markEmail(el));
};

const markEmail = (el) => {
  if (checkEmail(el.innerText)) {
    markValid(el);
    if (el === $(".email-verification")) markValid($(".resend"));
  } else {
    markInvalid(el);
    if (el === $(".email-verification")) markInvalid($(".resend"));
  }
  if (el === $("#email")) checkFormValid();
};

const insertTextAtCursor = (text) => {
  if (text === " ") text = space;
  let selection = window.getSelection();
  let range = selection.getRangeAt(0);
  range.deleteContents();
  let node = document.createTextNode(text);
  range.insertNode(node);

  for (let position = 0; position != text.length; position++) {
    selection.modify("move", "right", "character");
  }
};

const messageValidator = (el) => {
  el.on("blur keydown", () => {
    if (el.innerText !== "" && el.innerText != null) markValid($("#message"));
    else markInvalid($("#message"));
    checkFormValid();
  });
};

const validateField = (el) => {
  if (el.id === "name") nameValidator(el);
  if (el.id === "email") emailValidator(el);
  if (el.id === "message") messageValidator(el);
  if (el === $(".code")) codeValidator(el);
  if (el === $(".email-verification")) emailValidator(el);
};

const clearValid = (el) => {
  el.dataset.valid = "";
};

const markValid = (el) => {
  el.dataset.valid = "valid";
};

const markInvalid = (el) => {
  el.dataset.valid = "invalid";
};

const checkFormValid = () => {
  const name = $("#name").dataset.valid;
  const email = $("#email").dataset.valid;
  const message = $("#message").dataset.valid;

  if (name === "valid" && email === "valid" && message === "valid")
    markValid($(".send"));
  else markInvalid($(".send"));
};

const checkValidator = () => {
  const code = $(".code").dataset.valid;

  if (code === "valid") markValid($(".validate"));
  else markInvalid($(".validate"));
};

const codeValidator = (el) => {
  el.on(
    "keydown",
    (e) => {
      if (e.metaKey || e.key.in(acceptableKeys)) return;
      if ($(".code").innerText.length > 14) {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      if (e.key.in([...allLetters, ...nums])) insertTextAtCursor(e.key);
    },
    "pass"
  );

  el.on("keyup", validateCode);
};

const validateCode = () => {
  const code = $(".code").innerText.limit(15);
  $(".code").clearText();
  for (let i = 0; i < code.length; i++) {
    if (code[i].in([...allLetters, ...nums])) insertTextAtCursor(code[i]);
  }

  if (code.length >= 14) markValid($(".code"));
  else markInvalid($(".code"));

  checkValidator();
};

const hidePopup = (e) => {
  if (e.target === $(".popup")) $(".validator").hide();
};

const activateConfirmation = (e) => {
  e.preventDefault();
  if (e.target.dataset.valid !== "valid") return;
  $(".validator").show();
  keyboard.disable("Tab");
  sendEmail("confirm", collectData());
  $("p.email-verification").innerText = $("#email").innerText;

  markEmail($(".email-verification"));
  clearForm();
};

const clearForm = () => {
  $("#name").clearText();
  $("#email").clearText();
  $("#message").clearText();
  clearValid($("#name"));
  clearValid($("#email"));
  clearValid($("#message"));
  clearValid($(".send"));
};

const collectData = () => {
  const code = getCode();
  setLocal("name", $("#name").innerText);
  setLocal("email", $("#email").innerText);
  setLocal("message", $("#message").innerText);
  return {
    name: $("#name").innerText,
    email: $("#email").innerText,
    message: $("#message").innerText,
    code: code,
  };
};

const retrieveData = () => {
  return {
    name: getLocal("name"),
    email: getLocal("email"),
    message: getLocal("message"),
    code: getLocal("code"),
  };
};

export const clearData = () => {
  removeLocal("name");
  removeLocal("email");
  removeLocal("message");
  removeLocal("attempts");
  removeLocal("code");
};

const getCode = () => {
  let code = getLocal("code");
  if (code === "" || code == null) {
    code = generateNewCode();
    setLocal("code", code);
    setLocal("codeExpiration", new Date().addMins(15));
    startTimer();
  }
  return code;
};

const generateNewCode = () => {
  let buf = "",
    choices = [...nums, ...uppers, ...lowers];
  for (let i = 0; i < 14; i++) {
    buf += randChoice(choices);
  }
  return buf;
};

const startTimer = () => {
  setTimeout(checkCodeTime, 840000);
};

export const checkCodeTime = () => {
  if (!timerRunning) {
    timerRunning = true;
    const timeCheck = setInterval(() => {
      if (
        new Date(getLocal("codeExpiration")) < new Date() ||
        getLocal("code") === "" ||
        getLocal("code") == null
      ) {
        removeLocal("code");
        removeLocal("codeExpiration");
        clearInterval(timeCheck);
        timerRunning = false;
      }
    }, 10000);
  }
};

const getCodeAttempts = () => {
  let attempts = getLocal("codeAttempts");
  if (attempts === "" || attempts == null) {
    attempts = 3;
    setLocal("codeAttempts", 3);
  }
  return +attempts;
};

const verifyCode = () => {
  e.preventDefault();
  if (e.target.dataset.valid !== "valid") return;
  let attempts = getCodeAttempts();
  if (attempts > 0) {
    if ($(".code").innerText === getLocal("code")) {
      sendEmail("send", retrieveData());
      clearValidator();
      clearData();
    } else {
      $(".code").shake();
      attempts--;
      setLocal("codeAttempts", attempts);
    }
  } else {
    setLocal("block", "true");
    setLocal("blockExpiration", new Date().addHours(1));
    blockContact();
  }
};

const blockContact = () => {
  $(".blocked").show();
  $("form").hide();
};

const unblockContact = () => {
  $(".blocked").hide();
  $("form").show();
  setLocal("block", "false");
  removeLocal("blockExpiration");
};

const checkUnblock = () => {
  const timer = setInterval(() => {
    const expiration = getLocal("blockExpiration");
    if (expiration == null) {
      unblockContact();
      clearTimeout(timer);
    } else if (new Date(getLocal("blockExpiration")) < new Date()) {
      unblockContact();
      clearTimeout(timer);
    }
  }, 60000);
};

const resendCode = () => {
  e.preventDefault();
  if (e.target.dataset.valid !== "valid") return;
  setLocal("email", $("p.email-verification").innerText);
  sendEmail("confirm", retrieveData());
};

const clearValidator = () => {
  clearValid($(".validate"));
  clearValid($(".code"));
};

unblockContact();
