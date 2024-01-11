import "../../styles/app.css";
import "../../scripts/share.js";
import { _changeClasses } from "../../scripts/funcs/utils.js";
import changeContent from "./changeContents.js";
import routeProtect from "./routeProtect.js";

routeProtect();

let activeContent = "tickets";

const menuItems = document.querySelectorAll(".menu__item");
const notifBtn = document.querySelector(".notif-btn");
const overlay = document.querySelector(".overlay");
const openMobileMenuBtn = document.querySelector(".mobile-menu-open-btn");
const closeMobileMenuBtn = document.querySelector(".mobile-menu-close-btn");
const menuContainer = document.querySelector("aside");

// Menu Items

menuItems.forEach(menuItem => {
  menuItem.addEventListener("click", () => {
    menuItemClickHandler(menuItem);
  });
});

// Menu Item Click Handler

const menuItemClickHandler = menuItem => {
  const clickedMenu = menuItem.dataset.content;
  if (clickedMenu != activeContent) {
    _changeClasses("remove", document.querySelector(".menu__item.active"), ["active"]);
    _changeClasses("add", menuItem, ["active"]);

    changeContent(clickedMenu);

    activeContent = clickedMenu;
  }
};

// Open Mobile Menu

openMobileMenuBtn.addEventListener("click", () => {
  _changeClasses("add", menuContainer, ["show"]);
  _changeClasses("add", overlay, ["show"]);
  _changeClasses("add", document.body, ["overflow-hidden"]);
});

// Close Mobile Menu

const closeMobileMenu = () => {
  _changeClasses("remove", menuContainer, ["show"]);
  _changeClasses("remove", overlay, ["show"]);
  _changeClasses("remove", document.body, ["overflow-hidden"]);
};
closeMobileMenuBtn.addEventListener("click", closeMobileMenu);

// Notif Box

notifBtn.addEventListener("click", () => {
  _changeClasses("toggle", notifBtn, ["show"]);
  _changeClasses("toggle", overlay, ["show"]);
});

// Overlay

overlay.addEventListener("click", () => {
  _changeClasses("remove", notifBtn, ["show"]);
  _changeClasses("remove", overlay, ["show"]);
  _changeClasses("remove", menuContainer, ["show"]);
});
