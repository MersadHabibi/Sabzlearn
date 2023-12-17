import { _changeClasses } from "../../scripts/funcs/utils.js";
import preparerCreateCourse from "./createCourse.js";

const $ = document;

let activeContent = "tickets";
let newCourseCover = null;

const menuItems = $.querySelectorAll(".menu__item");
const contents = $.querySelectorAll(".content");
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
  const clickedMenu = menuItem.dataset.content;
  if (clickedMenu != activeContent) {
    _changeClasses("remove", $.querySelector(".menu__item.active"), ["active"]);
    _changeClasses("add", menuItem, ["active"]);

    changeContent(clickedMenu);

    activeContent = clickedMenu;
  }
};

// Change Content

const changeContent = (clickedMenu) => {
  contents.forEach((content) => {
    _changeClasses("add", content, ["hidden"]);
  });
  const targetContent = $.querySelector(`.${clickedMenu}`);
  _changeClasses("remove", targetContent, ["hidden"]);
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

window.addEventListener("load", () => {
  preparerCreateCourse();
});
