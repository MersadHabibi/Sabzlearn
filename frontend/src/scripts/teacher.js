import "../styles/app.css";
import "./share.js";
import header from "./header.js";
import { _changeClasses, api, createTimer, fullScreenLoader, getMe, showNotif } from "./funcs/utils.js";

header(document);

let sortBy = "all";

const overlay = document.querySelector(".overlay");
const sortBtns = document.querySelectorAll(".sort__value");
const mobileSortOpenBtn = document.querySelector(".mobile-sort__open-btn");
const mobileSortCloseBtn = document.querySelector(".mobile-sort-menu__close");
const mobileSortMenu = document.querySelector(".mobile-sort-menu");
const mobileSortMenuValues = document.querySelectorAll(".mobile-sort__value");

// Sort
sortBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    _changeClasses("remove", document.querySelector(".sort__value.active"), ["active"]);
    _changeClasses("add", btn, ["active"]);
    sortBy = btn.dataset.sort;
  });
});

// Mobile Sort
mobileSortMenuValues.forEach(btn => {
  btn.addEventListener("click", () => {
    _changeClasses("remove", document.querySelector(".mobile-sort__value.active"), ["active"]);
    _changeClasses("add", btn, ["active"]);
    sortBy = btn.dataset.sort;

    _changeClasses("remove", mobileSortMenu, ["open"]);
    _changeClasses("remove", overlay, ["show"]);
  });
});

// Open Mobile Sort Menu
mobileSortOpenBtn.addEventListener("click", () => {
  _changeClasses("add", mobileSortMenu, ["open"]);
  _changeClasses("add", overlay, ["show"]);
});

// Close Mobile Sort Menu
mobileSortCloseBtn.addEventListener("click", () => {
  _changeClasses("remove", mobileSortMenu, ["open"]);
  _changeClasses("remove", overlay, ["show"]);
});

// OverLay Click Handler - Close Mobile Sort Menu
overlay.addEventListener("click", () => {
  _changeClasses("remove", mobileSortMenu, ["open"]);
});
