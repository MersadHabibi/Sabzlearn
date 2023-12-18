import { _changeClasses } from "./funcs/utils.js";

const $ = document;

let openElem = {};

const searchBtn = $.querySelector(".search-btn");
const overlay = $.querySelector(".overlay");
const profile = $.querySelector(".profile");
const mobileSubmenuBtns = $.querySelectorAll(".mobile__submenu-btn");
const mobileMenu = $.querySelector(".mobile-menu");
const mobileMenuCloseBtn = $.querySelector(".mobile__close-btn");
const mobileMenuOpenBtn = $.querySelector(".mobile-menu__open-btn");

const openCloseoverlay = () => {
  _changeClasses("toggle", overlay, ["show"]);
};

const openCloseSearchBox = () => {
  _changeClasses("toggle", searchBtn, ["search-btn--active"]);
  openCloseoverlay();

  openElem = openElem == searchBtn ? null : searchBtn;
};

const openCloseProfileMenu = () => {
  _changeClasses("toggle", profile, ["profile--active"]);
  openCloseoverlay();

  openElem = openElem == profile ? null : profile;
};

const openAndCloseMobileMenuSubmenu = (e) => {
  let clickedElem = e.target.parentElement.parentElement;
  if (clickedElem.classList.contains("menu__item--active")) {
    _changeClasses("remove", clickedElem, ["menu__item--active"]);
  } else {
    const activeElem = $.querySelector(".menu__item--active");
    _changeClasses("remove", activeElem, ["menu__item--active"]);
    _changeClasses("add", clickedElem, ["menu__item--active"]);
  }
};

const openCloseMobileMenu = (action) => {
  if (action == "open") {
    _changeClasses("add", mobileMenu, ["mobile-menu--open"]);
    openCloseoverlay();

    openElem = mobileMenu;
  } else {
    _changeClasses("remove", mobileMenu, ["mobile-menu--open"]);
    openCloseoverlay();

    openElem = null;
  }
};

searchBtn.addEventListener("click", openCloseSearchBox);

profile.addEventListener("click", openCloseProfileMenu);

overlay.addEventListener("click", () => {
  if (openElem == searchBtn) {
    openCloseSearchBox();
  } else if (openElem == profile) {
    openCloseProfileMenu();
  } else {
    openCloseMobileMenu("close");
  }
  _changeClasses("remove", document.documentElement, ["overflow-hidden"]);
});

mobileSubmenuBtns.forEach((btn) => {
  btn.addEventListener("click", openAndCloseMobileMenuSubmenu);
});

mobileMenuCloseBtn.addEventListener("click", () => {
  openCloseMobileMenu("close");
});
mobileMenuOpenBtn.addEventListener("click", () => {
  openCloseMobileMenu("open");
});

// Set Link For Login And Register Btn

const setLinkForLoginAndRegisterBtn = () => {
  const registerBtn = $.querySelector(".register-btn");
  const loginBtn = $.querySelector(".login-btn");

  registerBtn.href = `./register.html?after=${location.pathname}`;
  loginBtn.href = `./login.html?after=${location.pathname}`;
};
setLinkForLoginAndRegisterBtn();
