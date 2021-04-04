const letters = /[a-zA-Z]/;

const numbers = /[0-9]/;

const space = "\xA0"

const isLetter = (char) => char.toLowerCase() != char.toUpperCase();

const $ = document.querySelector.bind(document);

const $$ = document.querySelectorAll.bind(document);

const setLocal = (key, value) => localStorage.setItem(key, value);

const getLocal = (key) => localStorage.getItem(key);

const removeLocal = (key) => localStorage.removeItem(key);

const remove = Element.prototype.remove;

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

Node.prototype.on = addEventListener;

Element.prototype.clean = function () {
  while (this.firstChild) this.firstChild.remove();
  return this;
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
  this.forEach((el) => {
    if (method === "call") callback.call(el);
    else if (method === "pass") callback(el);
  });
  return this;
};
