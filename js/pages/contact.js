export const contact = () => {
  $("#name").preventPaste();
  $$(".field span").each(validate, "pass");
};

const nameValidator = (el) => {
  el.on("keydown", (e) => {
    if (e.key === "Backspace" || e.key === "Tab") return;
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
        (isLetter(e.key) && e.key.length === 1) ||
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
      el.innerText = "";
      insertTextAtCursor(text);
      return;
    }
  });

  el.on("blur", () => {
    if (el.innerText.length === 0) markInvalid(el);
    else markValid(el);
    checkFormValid();
  });
};

const emailValidator = (el) => {
  el.on("keydown", (e) => {
    const text = el.innerText;
    const lastChar = text[text.length - 1];
    if (e.key === "Backspace" || e.key === "Tab") return;
    if (!e.metaKey) {
      e.preventDefault();
      if (
        (text.length === 0 &&
          e.key.match(letters) == null &&
          e.key.match(numbers) == null) ||
        e.code === "Space" ||
        (e.key === lastChar && lastChar === ".") ||
        (e.key === "@" && text.match(/@/)) ||
        e.key === "Enter" ||
        e.key.length > 1
      ) {
        if (e.key.length === 1) el.shake();
        return;
      } else {
        let key = e.key.toLowerCase();
        insertTextAtCursor(key);
      }
    }
  });

  el.on("blur", () => {
    if (checkEmail(el)) markValid(el);
    else markInvalid(el);
    checkFormValid();
  });
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

const checkEmail = (el) => {
  const email = el.innerText;

  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );
};

const validate = (el) => {
  if (el.id === "name") nameValidator(el);
  if (el.id === "email") emailValidator(el);
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
    $("button").dataset.valid = "valid";
  else $("button").dataset.invalid = "invalid";
};
