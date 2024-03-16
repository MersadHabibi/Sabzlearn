import { getMenus } from "../../../services/categoriesAPIs";
import { _changeClasses, showNotif } from "./utils";

const menus = async () => {
  const res = await getMenus();
  let menus = null;

  if (!res.status) {
    showNotif("اینترنت خود را بررسی کنید");
    return false;
  }

  menus = res.data;

  console.log(menus);

  const menusWrapper = document.querySelector(".menus__wrapper");
  const mobileMenusWrapper = document.querySelector(".mobile-menus-wrapper");

  menus.forEach((menu) => {
    menusWrapper.insertAdjacentHTML(
      "beforeend",
      `
    <li class="group relative">
      <a
        href="./categories.html?category=${menu.id}"
        class="flex items-center gap-x-1 text-base xl:text-lg">
        ${menu.name}
        <svg class="h-4 w-4">
          <use href="#chevron-down"></use>
        </svg>
      </a>
      <!-- SubMenu -->
      <ul
        class="absolute right-0 top-8 -z-10 w-64 space-y-5 rounded-2xl bg-white p-5 text-zinc-700 opacity-0 shadow-light transition-all group-hover:z-20 group-hover:opacity-100 child:line-clamp-1 child:cursor-pointer child:transition-colors child-hover:text-primary dark:bg-[#32334D] dark:text-white">
        ${menu.Course.map((course) => {
          return `
          <li>
            <a href="./course.html" onclick=courseClickHandler('${course.id}')>${course.title}</a>
          </li>
          `;
        }).join("")}
      </ul>
    </li>
    `,
    );
    // Mobile Menu

    mobileMenusWrapper.insertAdjacentHTML(
      "beforeend",
      `
      <li class="menu__item w-full">
        <div class="flex h-7 w-full items-center justify-between">
          <a href="./categories.html?category=${menu.id}">  ${menu.name} </a>
          <svg onclick="mobileMenuItemsClickHandler(this)" class="mobile__submenu-btn h-4 w-4 rotate-0 transition-all">
            <use href="#chevron-down"></use>
          </svg>
        </div>
        <ul
          class="submenu flex-col space-y-3 pr-2 pt-3 text-sm font-extralight child:inline-block child-hover:text-primary">
          
          ${menu.Course.map((course) => {
            return `
            <a href="./course.html" onclick=courseClickHandler('${course.id}')> ${course.title} </a>
            `;
          }).join("")}
        </ul>
      </li>
    `,
    );
  });

  window.mobileMenuItemsClickHandler = mobileMenuItemsClickHandler;
};

function mobileMenuItemsClickHandler(elem) {
  let clickedElem = elem.parentElement.parentElement;
  if (clickedElem.classList.contains("menu__item--active")) {
    _changeClasses("remove", clickedElem, ["menu__item--active"]);
  } else {
    const activeElem = document.querySelector(".menu__item--active");
    _changeClasses("remove", activeElem, ["menu__item--active"]);
    _changeClasses("add", clickedElem, ["menu__item--active"]);
  }
}

export default menus;
