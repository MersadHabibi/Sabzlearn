import { _changeClasses } from "./funcs/utils.js";

const $ = document;

let isSearchOpen = false;
let isProfileMenuOpen = false;

const searchBtn = $.querySelector(".search-btn");
const searchBox = $.querySelector(".search-box");
const cover = $.querySelector(".cover");
const profileMenuBtn = $.querySelector(".profile-menu-btn");
const profileMenu = $.querySelector(".profile-menu");

const openCover = () => {
  _changeClasses("remove", cover, ["opacity-0", "-z-10"]);
  _changeClasses("add", cover, ["opacity-1", "z-10"]);
};
const closeCover = () => {
  _changeClasses("add", cover, ["opacity-0", "-z-10"]);
  _changeClasses("remove", cover, ["opacity-1", "z-10"]);
};

const openSearchBox = () => {
  openCover();
  _changeClasses("remove", searchBox, ["hidden"]);
  _changeClasses("add", searchBtn, ["z-20"]);
  isSearchOpen = true;
};
const closeSearchBox = () => {
  closeCover();
  _changeClasses("add", searchBox, ["hidden"]);
  _changeClasses("remove", searchBtn, ["z-20"]);
  isSearchOpen = false;
};

const openProfileMenu = () => {
  openCover();
  _changeClasses("remove", profileMenu, ["hidden"]);
  _changeClasses("add", profileMenuBtn, ["z-20"]);
  isProfileMenuOpen = true;
};
const closeProfileMenu = () => {
  closeCover();
  _changeClasses("add", profileMenu, ["hidden"]);
  _changeClasses("remove", profileMenuBtn, ["z-20"]);
  isProfileMenuOpen = false;
};

searchBtn.addEventListener("click", () => {
  if (isSearchOpen) {
    closeSearchBox();
  } else {
    openSearchBox();
  }
});

profileMenuBtn.addEventListener("click", () => {
  if (isProfileMenuOpen) {
    closeProfileMenu();
  } else {
    openProfileMenu();
  }
});

cover.addEventListener("click", () => {
  closeCover();
  closeProfileMenu();
  closeSearchBox();
});
