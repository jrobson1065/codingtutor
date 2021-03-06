const letters = /[a-zA-Z]/;

const numbers = /[0-9]/;

const space = "\xA0";

const lowers = "abcdefghijklmnopqrstuvwxyz";
const uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const specials = "!@#$%^&*()_+-=[]{};':\",./<>?\\|`~";
const nums = "0123456789";
const allLetters = [...lowers, ...uppers];

const isLetter = (char) => char.toLowerCase() != char.toUpperCase();

const $ = document.querySelector.bind(document);

const $$ = document.querySelectorAll.bind(document);

const setLocal = (key, value) => localStorage.setItem(key, value);

const getLocal = (key) => localStorage.getItem(key);

const removeLocal = (key) => localStorage.removeItem(key);

const remove = Element.prototype.remove;

const animate = window.requestAnimationFrame.bind(window);

const build = (tag, parent) => {
  const el = create(tag);
  parent.append(el);
  return el;
};

const create = (tag) => {
  return document.createElement(tag);
};

const cleanPaste = (e) => {
  e.preventDefault();
  var text = (e.originalEvent || e).clipboardData.getData("text/plain");
  document.execCommand("insertHTML", false, text);
};

const checkEmail = (email) =>
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@+[a-zA-Z0-9-]+([a-zA-Z0-9-])+\.([a-zA-Z0-9-])+(?:[a-zA-Z0-9-])*$/.test(
    email
  );

const randBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randDec = (min, max) => Math.random() * (max - min + 1) + min;

const randChoice = (array) => array[randBetween(0, array.length - 1)];

const getDistance = (element) => {
  const e = window.event;
  return Math.floor(
    Math.sqrt(
      Math.pow(e.clientX - (element.offsetLeft + element.offsetWidth / 2), 2) +
        Math.pow(e.clientY - (element.offsetTop + element.offsetHeight / 2), 2)
    )
  );
};

const getDistanceBetween = (element, element2) => {
  element = element.getBoundingClientRect();
  return Math.floor(
    Math.sqrt(
      Math.pow(
        element.left +
          element.width / 2 -
          (element2.offsetLeft + element2.offsetWidth / 2),
        2
      ) +
        Math.pow(
          element.top +
            element.height / 2 -
            (element2.offsetTop + element2.offsetHeight / 2),
          2
        )
    )
  );
};

const array = (item) => {
  if (!Array.isArray(item) && typeof item !== "object") item = [item];
  return item;
};

const flipLetters = (elements, speed) => {
  text = array(elements);
  text.each((t, i) => {
    i *= speed;
    setTimeout(() => {
      t.classList.add("flip");
    }, i);
    setTimeout(() => {
      t.classList.remove("flip");
    }, i + 3000);
  });
};

class Keyboard {
  eventListeners = {};

  disable = (keys) => {
    keys = [...keys.split(" ")];
    keys.forEach((key) => {
      let listener = this.eventListeners[key];
      if (listener == null) {
        listener = this._disableKey.bind(this, key);
        this.eventListeners[key] = listener;
      }
      document.on("keydown", listener);
    });
  };

  enable = (keys) => {
    keys = [...keys.split(" ")];
    keys.forEach((key) => {
      const listener = this.eventListeners[key];
      document.removeEventListener("keydown", listener);
    });
  };

  enableAll = () => {
    for (key in Object.keys(this.eventListeners)) this.enable(key);
  };

  _disableKey = (key) => {
    const e = window.event;
    if (e.key === key) e.preventDefault();
  };
}

const keyboard = new Keyboard();

const preventPaste = (Node.prototype.preventPaste = function () {
  this.on("paste", (e) => e.preventDefault());
});

const preventCut = (Node.prototype.preventPaste = function () {
  this.on("cut", (e) => e.preventDefault());
});

const preventCopy = (Node.prototype.preventPaste = function () {
  this.on("copy", (e) => e.preventDefault());
});

const preventAll = (Node.prototype.preventPaste = function () {
  this.on("paste", (e) => e.preventDefault());
  this.on("cut", (e) => e.preventDefault());
  this.on("copy", (e) => e.preventDefault());
});

Element.prototype.shake = function () {
  if (this.classList.contains("shake")) return;
  this.classList.add("shake");
  setTimeout(() => {
    this.classList.remove("shake");
  }, 1000);
};

Element.prototype.build = function (component) {
  this.innerHTML = component;
  return this;
};

Element.prototype.toggle = function (className) {
  this.classList.toggle(className);
  return this;
};

Node.prototype.on = function (events, callback) {
  events = [...events.split(" ")];
  events.forEach((e) => this.addEventListener(e, callback));
};

Element.prototype.clean = function () {
  while (this.firstChild) this.firstChild.remove();
  return this;
};

Element.prototype.show = function () {
  this.classList.remove("hidden");
};

Element.prototype.hide = function () {
  this.classList.add("hidden");
};

HTMLElement.prototype.click = function (...callbacks) {
  callbacks.forEach((cb) => this.on("click", cb));
  return this;
};

Element.prototype.clearText = function () {
  this.innerText = "";
};

Element.prototype.span = function (type = "") {
  const text = array(this.innerText.split(""));
  this.clearText();

  let label;

  if (type === "words") {
    text.each((item, i) => {
      if (label == null) label = document.createElement("label");
      const span = document.createElement("span");

      if (item !== " ") {
        span.innerHTML = item;
        label.append(span);
      } else {
        this.append(label);
        span.innerHTML = "&nbsp;";
        this.appendChild(span);
        label = null;
      }
      if (i + 1 >= text.length) this.append(label);
    });
  } else {
    text.each((item) => {
      const span = document.createElement("span");

      if (item === " ") item = "&nbsp;";
      span.innerHTML = item;
      this.append(span);
    });
  }
};

const buildSpan = (item) => {
  const span = document.createElement("span");
  if (item === " ") item = "&nbsp;";
  span.innerHTML = item;
  this.append(span);
};

Element.prototype.text = function (text) {
  this.innerText = text;
  return this;
};

Element.prototype.html = function (html) {
  this.innerHTML = html;
  return this;
};

Element.prototype.addId = function (id) {
  this.id = id;
  return this;
};

Element.prototype.addClass = function (className) {
  this.classList.add(className);
  return this;
};

Element.prototype.removeClass = function (className) {
  this.classList.remove(className);
  return this;
};

Element.prototype.class = function (className) {
  this.className = className;
  return this;
};

Document.prototype.on = addEventListener;

Document.prototype.ready = function (...callbacks) {
  callbacks.forEach((cb) => document.on("DOMContentLoaded", cb));
  return this;
};

Object.prototype.each = function (callback, method = "pass") {
  this.forEach((item, i) => {
    if (method === "call") callback.call(item, i);
    else if (method === "pass") callback(item, i);
  });
  return this;
};

Array.prototype.each = function (callback, method = "pass") {
  this.forEach((item, i) => {
    if (method === "call") callback.call(item, i);
    else if (method === "pass") callback(item, i);
  });
  return this;
};

String.prototype.in = function (array) {
  return array.some((a) => a == this);
};

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.limit = function (max, start = 0) {
  return this.substring(start, start + max);
};

Date.prototype.addHours = function (hours) {
  this.setHours(this.getHours() + hours);
  return this;
};

Date.prototype.addMins = function (mins) {
  this.setMinutes(this.getMinutes() + mins);
  return this;
};
