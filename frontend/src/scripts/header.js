import { getMe, logoutApi } from "../../services/usersAPIs.js";
import menus from "./funcs/menus.js";
import { _changeClasses } from "./funcs/utils.js";

const header = async ($) => {
  let openElem = {};

  menus();

  const searchBtn = $.querySelector(".search-btn");
  const searchBox = $.querySelector(".search-box");
  const searchBoxForm = $.querySelector(".search-box-form");
  const searchBoxInput = $.querySelector(".search-box-input");
  const mobileSearchBoxForm = $.querySelector(".mobile-search-box-form");
  const mobileSearchBoxInput = $.querySelector(".mobile-search-box-input");
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

  // Set Link For Login And Register Btn

  const setLinkForLoginAndRegisterBtn = () => {
    const registerBtn = $.querySelector(".register-btn");
    const loginBtn = $.querySelector(".login-btn");
    const mobileLoginBtn = $.querySelector(".mobile-login-btn");

    registerBtn.addEventListener("click", () => {
      location.href = `./register.html?after=${location.pathname}`;
    });
    loginBtn.addEventListener("click", () => {
      location.href = `./login.html?after=${location.pathname}`;
    });
    mobileLoginBtn.addEventListener("click", () => {
      location.href = `./login.html?after=${location.pathname}`;
    });
  };
  setLinkForLoginAndRegisterBtn();

  // Check User Login

  let user = null;

  const checkUserLogin = async () => {
    const profileContainer = $.querySelector(".profile__container");
    const loginAndRegisterContainer = $.querySelector(
      ".login-register__container",
    );
    user = await getMe();
    console.log(user);

    if (user === null) {
      _changeClasses("remove", loginAndRegisterContainer, ["hidden"]);
      return;
    }
    _changeClasses("remove", profileContainer, ["hidden"]);
    setContentProfileSubmenu(user);
  };
  await checkUserLogin();

  // Set Profile Submenu Content

  function setContentProfileSubmenu(data) {
    const profileNameElem = $.querySelector(".profile__name");

    profileNameElem.innerHTML = data.username;
  }

  // Search

  searchBox.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  searchBoxForm.addEventListener("submit", (e) => {
    e.preventDefault();

    location.href = searchBoxInput.value
      ? `./categories.html?s=${searchBoxInput.value}`
      : location.href;
  });
  mobileSearchBoxForm.addEventListener("submit", (e) => {
    e.preventDefault();

    location.href = mobileSearchBoxInput.value
      ? `./categories.html?s=${mobileSearchBoxInput.value}`
      : location.href;
  });

  // Logout Btn

  const logoutBtn = $.querySelector(".logout-btn");

  logoutBtn.addEventListener("click", async () => {
    const res = await logoutApi();

    if (res.status) {
      localStorage.removeItem("token");
      location.reload();
    }
  });

  // Show profile

  const profileElems = document.querySelectorAll(".header__profile");

  profileElems.forEach((elem) => {
    elem.src = user?.imageProfile;
  });
};

export default header;
