import { _changeClasses } from "./funcs/utils.js";

const $ = document;
const overlay = $.querySelector(".overlay");

// Mobile Aside

const mobileAsideOpenBtn = $.querySelector(".moblie-aside__open");
const mobileAsideCloseBtn = $.querySelector(".mobile-aside__close");
const mobileAsideContainer = $.querySelector(".panel-menu__container");

mobileAsideOpenBtn.addEventListener("click", () => {
  _changeClasses("add", mobileAsideContainer, ["open"]);
  _changeClasses("add", overlay, ["show"]);
  _changeClasses("add", document.documentElement, ["overflow-hidden"]);
});
mobileAsideCloseBtn.addEventListener("click", () => {
  _changeClasses("remove", mobileAsideContainer, ["open"]);
  _changeClasses("remove", overlay, ["show"]);
  _changeClasses("remove", document.documentElement, ["overflow-hidden"]);
});

// Overlay Click

overlay.addEventListener("click", () => {
  _changeClasses("remove", mobileAsideContainer, ["open"]);
});
