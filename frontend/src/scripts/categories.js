import "../styles/app.css";
import "./share.js";
import header from "./header.js";
import { _changeClasses } from "./funcs/utils.js";
import createCourseCard, { courseClickHandler, categoryClickHandler } from "./funcs/createCourseCard.js";
import { getAllCourses, getCoursesByCategoryId } from "../../services/coursesAPIs.js";
import { getAllCategories } from "../../services/categoriesAPIs.js";

window.courseClickHandler = courseClickHandler;
window.categoryClickHandler = categoryClickHandler;

const $ = document;
header($);

let allCourses = null;
let category = "all";
let onlyFree = false;
let onlyPresell = false;
let sortBy = "all";
let search = null;

const overlay = $.querySelector(".overlay");

// Open Mobile Sort And Filter Menu Elements

const mobileFiltersOpenBtn = $.querySelector(".mobile-filters__open-btn");
const mobileSortOpenBtn = $.querySelector(".mobile-sort__open-btn");
const mobileSortOpenBtnText = $.querySelector(".mobile-sort__open-btn--text");

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

// category title - course container

const categoryTitleElem = $.querySelector(".category-title");
const courseContainer = $.querySelector(".course__container");

// Change Sort Values

mobileSortValues.forEach(sort => {
  sort.addEventListener("click", () => {
    mobileSortValues.forEach(e => {
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

// Get Params - query string

const getParams = async () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  category = (await getAllCategories()).find(category => category.categoryId == params.category) || "all";

  changeCategoryTitle();

  search = params.s ? params.s : null;

  await loadCourses();
};

// Chnage Category Title

const changeCategoryTitle = () => {
  categoryTitleElem.innerHTML = search ? `جستجو : ${search}` : category === "all" ? "همه دوره ها" : category.categoryName ? category.categoryName : "ارور";
};

// Sort Courses

sortValues.forEach(sort => {
  sort.addEventListener("click", async element => {
    sortValues.forEach(e => {
      _changeClasses("remove", e, ["active"]);
    });
    _changeClasses("add", sort, ["active"]);

    sortBy = sort.dataset.sort;

    await loadCourses();
  });
});

// Sort Courses Mobile

mobileSortValues.forEach(sort => {
  sort.addEventListener("click", async element => {
    sortValues.forEach(e => {
      _changeClasses("remove", e, ["active"]);
    });
    _changeClasses("add", sort, ["active"]);

    mobileSortOpenBtnText.innerHTML = sort.children[0].innerHTML;

    sortBy = sort.dataset.sort;

    await loadCourses();
  });
});

// Only Free Courses

const onlyFreeCourses = () => {
  const onlyFreeCoursesInput = $.querySelector("#only-free-input");

  onlyFreeCoursesInput.addEventListener("change", async () => {
    onlyFree = !onlyFree;
    await loadCourses();
  });
};

// Only Presell Courses

const onlyPresellCourse = () => {
  const onlyPresellInput = $.querySelector("#only-presell-input");

  onlyPresellInput.addEventListener("change", async () => {
    onlyPresell = !onlyPresell;

    await loadCourses();
  });
};

// Mobile Filters

const mobileFilters = () => {
  const onlyFreeInput = $.querySelector("#mobile-only-free-input");
  const onlyPresellInput = $.querySelector("#mobile-only-presell-input");
  const mobileFiltersMenuSubmitBtn = $.querySelector(".mobile-filters-menu-submit");
  const mobileFiltersMenuClearBtn = $.querySelector(".mobile-filters-menu-clear");

  let free = false;
  let presell = false;

  onlyFreeInput.addEventListener("change", () => {
    free = !free;
  });

  onlyPresellInput.addEventListener("change", () => {
    presell = !presell;
  });

  mobileFiltersMenuSubmitBtn.addEventListener("click", async () => {
    onlyFree = free;
    onlyPresell = presell;
    await loadCourses();
    closeMobileFiltersMenu();
  });

  mobileFiltersMenuClearBtn.addEventListener("click", () => {
    onlyFreeInput.checked = false;
    onlyPresellInput.checked = false;
    free = false;
    presell = false;
  });
};

// Search Handler

const searchHandler = () => {
  const searchCourseForm = $.querySelector("#search-course-form");
  const searchCourseInput = $.querySelector("#search-course");

  searchCourseForm.addEventListener("submit", async e => {
    e.preventDefault();

    search = searchCourseInput.value;
    categoryTitleElem.innerHTML = `جستجو:  ${search}`;
    await loadCourses();
  });
};

// load Courses

const loadCourses = async () => {
  // Filter By Category

  let coursesByCategory = category === "all" ? await getAllCourses() : (await getCoursesByCategoryId(category.categoryId)).courses;

  // Filter By Filters Value

  let coursesByFilters =
    onlyFree && onlyPresell
      ? coursesByCategory.filter(course => {
          return course.isFree && course.status == "presell";
        })
      : onlyFree
      ? coursesByCategory.filter(course => {
          return course.isFree;
        })
      : onlyPresell
      ? coursesByCategory.filter(course => {
          return course.status == "presell";
        })
      : [...coursesByCategory];

  // Filter By Sort

  let coursesBySort =
    sortBy == "cheapest"
      ? [...coursesByFilters]
          .sort((a, b) => {
            return a.price - b.price;
          })
          .filter(course => {
            return !course.isFree;
          })
      : sortBy == "expensive"
      ? [...coursesByFilters]
          .sort((a, b) => {
            return b.price - a.price;
          })
          .filter(course => {
            return !course.isFree;
          })
      : sortBy == "popular"
      ? [...coursesByFilters].sort((a, b) => {
          return b.studentsCount - a.studentsCount;
        })
      : [...coursesByFilters];

  // Filter By Search

  let coursesBySearch = search
    ? coursesBySort.filter(course => {
        return course.title.includes(search) || course.shortName.includes(search);
      })
    : [...coursesBySort];

  courseContainer.innerHTML = "";
  coursesBySearch.forEach(course => {
    courseContainer.insertAdjacentHTML("beforeend", createCourseCard(course));
  });
};

window.addEventListener("load", async () => {
  await getParams();
  onlyFreeCourses();
  onlyPresellCourse();
  mobileFilters();
  searchHandler();
});
