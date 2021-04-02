const $ = document.querySelector.bind(document);

const $$ = document.querySelectorAll.bind(document);

const setLocal = (key, value) => localStorage.setItem(key, value);

const getLocal = (key) => localStorage.getItem(key);

const removeLocal = (key) => localStorage.removeItem(key);

const remove = Element.prototype.remove;

Element.prototype.build = function (component) {
  this.innerHTML = component;
  return this;
};

Element.prototype.toggle = function (className) {
  this.classList.toggle(className);
  return this;
};

Element.prototype.on = addEventListener;

Element.prototype.clean = function() {
    while (this.firstChild) this.firstChild.remove();
    return this;
}

HTMLElement.prototype.click = function (...callbacks) {
  callbacks.forEach((cb) => this.addEventListener("click", cb));
  return this;
};

Document.prototype.on = addEventListener;

Document.prototype.ready = function(...callbacks) {
  callbacks.forEach((cb) => document.addEventListener("DOMContentLoaded", cb));
  return this;
};

Object.prototype.each = function (callback, method = "call") {
  this.forEach((el) => {
    if (method === "call") callback.call(el);
    else if (method === "pass") callback(el);
  });
  return this;
};
