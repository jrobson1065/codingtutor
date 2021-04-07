const letters = /[a-zA-Z]/;

const numbers = /[0-9]/;

const space = "\xA0";

const lowers = "abcdefghijklmnopqrstuvwxyz";
const uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const specials = "!@#$%^&*()_+-=[]{};':\",./<>?\\|`~";
const nums = "0123456789";

const isLetter = (char) => char.toLowerCase() != char.toUpperCase();

const $ = document.querySelector.bind(document);

const $$ = document.querySelectorAll.bind(document);

const setLocal = (key, value) => localStorage.setItem(key, value);

const getLocal = (key) => localStorage.getItem(key);

const removeLocal = (key) => localStorage.removeItem(key);

const remove = Element.prototype.remove;

const checkEmail = (email) =>
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@+[a-zA-Z0-9-]+([a-zA-Z0-9-])+\.([a-zA-Z0-9-])+(?:[a-zA-Z0-9-])*$/.test(
    email
  );

const randBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randChoice = (array) => array[randBetween(0, array.length - 1)];

class Keyboard {
  eventListeners = {};

  disable = (keys) => {
    console.log("Called");
    keys = [...keys.split(" ")];
    keys.forEach((key) => {
      let listener = this.eventListeners[key];
      if (listener == null) {
        listener = this.disableKey.bind(this, key);
        this.eventListeners[key] = listener;
      }
      console.log(listener);
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

Document.prototype.on = addEventListener;

Document.prototype.ready = function (...callbacks) {
  callbacks.forEach((cb) => document.on("DOMContentLoaded", cb));
  return this;
};

Object.prototype.each = function (callback, method = "call") {
  this.forEach((el, i) => {
    if (method === "call") callback.call(el, i);
    else if (method === "pass") callback(el, i);
  });
  return this;
};

String.prototype.in = function (array) {
  return array.some((a) => a == this);
};

Date.prototype.addHours = function (hours) {
  this.setHours(this.getHours() + hours);
  return this;
};

Date.prototype.addMins = function (mins) {
  this.setMinutes(this.getMinutes() + mins);
  return this;
};
