import { _changeClasses } from "./funcs/utils.js";

const $ = document;

const overlay = $.querySelector(".overlay");

// Open Mobile Sort And Filter Menu Elements
const mobileFiltersOpenBtn = $.querySelector(".mobile-filters__open-btn");
const mobileSortOpenBtn = $.querySelector(".mobile-sort__open-btn");

// close Mobile Sort And Filter Menu Elements
const mobileFiltersCloseBtn = $.querySelector(".mobile-filters-menu__close");
const mobileSortCloseBtn = $.querySelector(".mobile-sort-menu__close");

// Mobile Sort And Filters Menu Elements
const mobileFiltersMenu = $.querySelector(".mobile-filters-menu");
const mobileSortMenu = $.querySelector(".mobile-sort-menu");

// Sort Values Element
const sortValues = $.querySelectorAll(".sort__value");

// Mobile Sort Values Element
const mobileSortValues = $.querySelectorAll(".mobile-sort__value");

// Open and Close Mobile Filters Menu

const openMobileFiltersMenu = () => {
  _changeClasses("add", mobileFiltersMenu, ["open"]);
  _changeClasses("add", document.documentElement, ["overflow-hidden"]);
};
const closeMobileFiltersMenu = () => {
  _changeClasses("remove", mobileFiltersMenu, ["open"]);
  _changeClasses("remove", document.documentElement, ["overflow-hidden"]);
};
mobileFiltersOpenBtn.addEventListener("click", openMobileFiltersMenu);
mobileFiltersCloseBtn.addEventListener("click", closeMobileFiltersMenu);

// Open and Close Mobile Sort Menu

const openMobileSortMenu = () => {
  _changeClasses("add", mobileSortMenu, ["open"]);
  _changeClasses("add", document.documentElement, ["overflow-hidden"]);
  _changeClasses("add", overlay, ["show"]);
};
const closeMobileSortMenu = () => {
  _changeClasses("remove", mobileSortMenu, ["open"]);
  _changeClasses("remove", document.documentElement, ["overflow-hidden"]);
  _changeClasses("remove", overlay, ["show"]);
};
mobileSortOpenBtn.addEventListener("click", openMobileSortMenu);
mobileSortCloseBtn.addEventListener("click", closeMobileSortMenu);

// Change Sort Values

sortValues.forEach((sort) => {
  sort.addEventListener("click", () => {
    sortValues.forEach((e) => {
      _changeClasses("remove", e, ["active"]);
    });

    _changeClasses("add", sort, ["active"]);
  });
});

// Change Sort Values

mobileSortValues.forEach((sort) => {
  sort.addEventListener("click", () => {
    mobileSortValues.forEach((e) => {
      _changeClasses("remove", e, ["active"]);
    });

    _changeClasses("add", sort, ["active"]);
    closeMobileSortMenu();
  });
});

// Overlay Click

overlay.addEventListener("click", () => {
  closeMobileSortMenu();
});
