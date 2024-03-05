import "../styles/app.css";
import "./share.js";
import { _changeClasses } from "./funcs/utils.js";
import { loadPanelContent } from "./userPanel/panel-content.js";
import { getMe } from "../../services/usersAPIs.js";

const user = await getMe();

console.log("user", user);

if (!user) location.replace("./index.html");

document.querySelector(".user__name").innerHTML =
  user.name && user.family ? `${user.name} ${user.family}` : user.username;

// Default Variables
window.loadPanelContent = loadPanelContent;
const overlay = document.querySelector(".overlay");

// Mobile Aside
const mobileAsideOpenBtn = document.querySelector(".moblie-aside__open");
const mobileAsideCloseBtn = document.querySelector(".mobile-aside__close");
const mobileAsideContainer = document.querySelector(".panel-menu__container");

// Panel Menu - Active Default
const panelMenuItem = document.querySelectorAll(".panel-menu__item");

const panelMobileMenuText = document.querySelectorAll(
  ".panel-mobile-menu-text__item",
);

// Mobile Aside - open & close

const openMobileAside = () => {
  _changeClasses("add", mobileAsideContainer, ["open"]);
  _changeClasses("add", overlay, ["show"]);
  _changeClasses("add", document.documentElement, ["overflow-hidden"]);
};
const closeMobileAside = () => {
  _changeClasses("remove", mobileAsideContainer, ["open"]);
  _changeClasses("remove", overlay, ["show"]);
  _changeClasses("remove", document.documentElement, ["overflow-hidden"]);
};
mobileAsideOpenBtn.addEventListener("click", openMobileAside);
mobileAsideCloseBtn.addEventListener("click", closeMobileAside);

// Profile

const profileBtn = document.querySelector(".profile");
profileBtn.addEventListener("click", () => {
  _changeClasses("add", profileBtn, ["open"]);
  _changeClasses("add", overlay, ["show"]);
});

const profileName = document.querySelector(".profile__name");
profileName.innerHTML =
  user.name && user.family
    ? `${user.name} ${user.family}`
    : user.name
      ? user.name
      : user.username;

// Notif

const notifBtn = document.querySelector(".notif-btn");
notifBtn.addEventListener("click", () => {
  console.log("add");
  _changeClasses("add", notifBtn, ["open"]);
  _changeClasses("add", overlay, ["show"]);
});

// Overlay Click

overlay.addEventListener("click", () => {
  _changeClasses("remove", mobileAsideContainer, ["open"]);
  _changeClasses("remove", notifBtn, ["open"]);
  _changeClasses("remove", overlay, ["show"]);
  _changeClasses("remove", profileBtn, ["open"]);
});

// Load Content - Click Aside Menu

const ChangeContentWithMenu = (element) => {
  console.log("ChangeContentWithMenu");
  const contentName = element.dataset.panelContent;
  loadPanelContent(contentName, user);
  closeMobileAside();

  setMobileMenuTitle(contentName); // set Mobile Menu Title

  window.history.pushState(
    "",
    "",
    `${location.pathname}?content=${contentName}`,
  );
};

// Menu Click - Change Content

panelMenuItem.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    _changeClasses(
      "remove",
      document.querySelector(".panel-menu__item.active"),
      ["active"],
    );
    _changeClasses("add", btn, ["active"]);
    ChangeContentWithMenu(btn);
  });
});

// Load Content onLoad Window - With Query String

function getParamsAndChangeContent() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  if (params.content) {
    loadPanelContent(params.content, user);
  } else {
    loadPanelContent("home", user);
  }

  // Highlight Active Btn
  panelMenuItem.forEach((btn) => {
    if (btn.dataset.panelContent == params.content) {
      _changeClasses(
        "remove",
        document.querySelector(".panel-menu__item.active"),
        ["active"],
      );
      _changeClasses("add", btn, ["active"]);
    }
  });
  // set Mobile Menu Title
  setMobileMenuTitle(params.content);
}

// Mobile Menu Title

const setMobileMenuTitle = (contentName) => {
  panelMobileMenuText.forEach((e) => {
    _changeClasses("remove", e, ["!block"]);
  });
  contentName = contentName == "new-ticket" ? "tickets" : contentName; // check new-ticket
  const panelMobileMenuTextActive = document.querySelector(
    `.panel-mobile-menu-text__item#${contentName}`,
  );
  _changeClasses("add", panelMobileMenuTextActive, ["!block"]);
};

// Logout Btn Handler

const logoutBtn = document.querySelector(".logout-btn");

logoutBtn.addEventListener("click", async () => {
  const res = await logoutApi();

  if (res.status) {
    localStorage.removeItem("token");
    location.replace("./index.html");
  }
});

getParamsAndChangeContent();
