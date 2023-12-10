import { _changeClasses } from "./funcs/utils.js";
import { loadPanelContent } from "./panel-content.js";

// Load Content onLoad Window - With Query String

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
if (params.content) {
  loadPanelContent(params.content);
} else {
  loadPanelContent("home");
}

// Default Variables

const $ = document;
const overlay = $.querySelector(".overlay");

// Mobile Aside

const mobileAsideOpenBtn = $.querySelector(".moblie-aside__open");
const mobileAsideCloseBtn = $.querySelector(".mobile-aside__close");
const mobileAsideContainer = $.querySelector(".panel-menu__container");

// Panel Menu - Active Default

const panelMenuItem = $.querySelectorAll(".panel-menu__item");
if (params.content) {
  panelMenuItem.forEach((e) => {
    if (e.dataset.panelContent != params.content) {
      _changeClasses("remove", e, ["active"]);
    } else {
      _changeClasses("add", e, ["active"]);
    }
  });
}

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

// Overlay Click

overlay.addEventListener("click", () => {
  _changeClasses("remove", mobileAsideContainer, ["open"]);
});

// Load Content - Click Aside Menu

const ChangeContent = (event, element) => {
  const content = element.dataset.panelContent;
  loadPanelContent(content);
  closeMobileAside();

  window.history.pushState("", "", `http://127.0.0.1:5500/frontend/public/panel.html?content=${content}`);

  panelMenuItem.forEach((e) => {
    _changeClasses("remove", e, ["active"]);
  });
  _changeClasses("add", element, ["active"]);
};

panelMenuItem.forEach((e) => {
  e.addEventListener("click", (event) => {
    ChangeContent(event, e);
  });
}); 
