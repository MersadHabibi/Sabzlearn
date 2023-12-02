import { BackendApi, _changeClasses } from "./funcs/utils.js";

const $ = document;

let openElem = {};

const searchBtn = $.querySelector(".search-btn");
const overlay = $.querySelector(".overlay");
const profile = $.querySelector(".profile");
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

mobileMenuCloseBtn.addEventListener("click", () => {
  openCloseMobileMenu("close");
});
mobileMenuOpenBtn.addEventListener("click", () => {
  openCloseMobileMenu("open");
});

// Get Menu Items

const getMenuItem = async () => {
  const menuContainer = $.querySelector(".header-menu");
  const mobileMenuContainer = $.querySelector(".mobile-menu__container");

  const res = await fetch(`${BackendApi}/menus`);
  const menus = await res.json();

  const getSubmenus = (menuItem) => {
    let titles = [];

    for (let i = 0; i < menuItem.submenus.length; i++) {
      titles.push(`
      <li>
        <a href=./course.html?courseName=${menuItem.submenus[i].href}>${menuItem.submenus[i].title}</a>
      </li>
      `);
    }

    return titles;
  };

  menus.slice(0, 5).forEach((menuItem) => {
    menuContainer.insertAdjacentHTML(
      "beforeend",
      `
    <li class="relative group">
      <a href=./categories.html?value=${menuItem.href} class="flex items-center gap-x-1 text-base xl:text-lg">
        ${menuItem.title}
        ${
          menuItem.submenus.length > 0
            ? `
              <svg class="w-4 h-4">
                <use href="#chevron-down"></use>
              </svg>
              `
            : ""
        }
        
      </a>
      <!-- SubMenu -->
      ${
        menuItem.submenus.length > 0
          ? `
          <ul
            class="-z-10 group-hover:z-20 opacity-0 group-hover:opacity-100 transition-all absolute top-8 right-0 child:line-clamp-1 child:cursor-pointer p-5 w-64 bg-white dark:bg-[#32334D] dark:text-white rounded-2xl space-y-5 text-zinc-700 shadow-light child-hover:text-primary child:transition-colors">
            ${getSubmenus(menuItem).join("")}
          </ul>
          `
          : ""
      }
      
    </li>
    `
    );
    mobileMenuContainer.insertAdjacentHTML(
      "beforeend",
      `
    <li class="menu__item w-full">
      <div class="flex justify-between items-center w-full h-7">
        <a href=./categories.html?value=${menuItem.href}> ${menuItem.title} </a>
        ${
          menuItem.submenus.length > 0
            ? `
            <svg class="mobile__submenu-btn rotate-0 w-4 h-4 transition-all">
              <use href="#chevron-down"></use>
            </svg>
              `
            : ""
        }
        
      </div>
      ${
        menuItem.submenus.length > 0
          ? `
          <ul class="submenu flex-col pt-3 pr-2 text-sm space-y-3 font-extralight child-hover:text-primary child:inline-block">
            ${getSubmenus(menuItem).join("")}
          </ul>
          `
          : ""
      }
    </li>
    `
    );

    // console.log(menuItem);
  });

  const mobileSubmenuBtns = $.querySelectorAll(".mobile__submenu-btn");

  mobileSubmenuBtns.forEach((btn) => {
    btn.addEventListener("click", openAndCloseMobileMenuSubmenu);
  });
};
getMenuItem();
