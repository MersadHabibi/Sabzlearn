import changeContent from "./index-content.js";
import { _changeClasses } from "../../scripts/funcs/utils.js";

const $ = document;

let whichContent = "tickets";
changeContent(whichContent);

const menuItems = $.querySelectorAll(".panel-menu__item");
const notifBtn = $.querySelector(".notif-btn");
const notifBox = $.querySelector(".notif-box");
const overlay = $.querySelector(".overlay");
const openMobileMenuBtn = $.querySelector(".mobile-menu-open-btn");
const closeMobileMenuBtn = $.querySelector(".mobile-menu-close-btn");
const menuContainer = $.querySelector("aside");

// Menu Items

menuItems.forEach((menuItem) => {
  menuItem.addEventListener("click", () => {
    menuItemClickHandler(menuItem);
  });
});

// Menu Item Click Handler

const menuItemClickHandler = (menuItem) => {
  if (menuItem.dataset.panelContent == whichContent) {
    return;
  } else {
    _changeClasses("remove", $.querySelector(".panel-menu__item.active"), [
      "active",
    ]);
    _changeClasses("add", menuItem, ["active"]);

    changeContent(menuItem.dataset.panelContent);
    whichContent = menuItem.dataset.panelContent;
  }
};

// Open Mobile Menu

openMobileMenuBtn.addEventListener("click", () => {
  _changeClasses("add", menuContainer, ["show"]);
  _changeClasses("add", overlay, ["show"]);
  _changeClasses("add", $.body, ["overflow-hidden"]);
});

// Close Mobile Menu

const closeMobileMenu = () => {
  _changeClasses("remove", menuContainer, ["show"]);
  _changeClasses("remove", overlay, ["show"]);
  _changeClasses("remove", $.body, ["overflow-hidden"]);
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
