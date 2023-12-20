import { _changeClasses, api } from "./funcs/utils.js";
import { createCourseCard } from "./funcs/share.js";

const $ = document;

let allCourses = null;
let filterCourses = null;
let coursesBackup = null;
let category = "all";

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

// Get Params - query string

const getParams = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  if (params.category) {
    category = params.category;
  }
};

// Get Courses

const getCourses = async () => {
  const res = await fetch(`${api}admin/courses`);
  allCourses = await res.json();
};

// Chnage Category Title

const changeCategoryTitle = () => {
  categoryTitleElem.innerHTML =
    category == "all"
      ? "همه دوره ها"
      : category == "frontend"
      ? "فرانت اند"
      : category == "security"
      ? "امنیت"
      : category == "python"
      ? "پایتون"
      : category == "softskills"
      ? "مهارت های نرم"
      : "ٍارور";
};

// Get And Show Courses Default - with params

const getAndShowCourses = () => {
  filterCourses =
    category == "all"
      ? [...allCourses]
      : allCourses.filter((course) => {
          return course.category == category;
        });

  coursesBackup = [...filterCourses];

  loadCourses(filterCourses);

  console.log(filterCourses);
};

// Sort Courses

sortValues.forEach((sort) => {
  sort.addEventListener("click", (element) => {
    sortValues.forEach((e) => {
      _changeClasses("remove", e, ["active"]);
    });
    _changeClasses("add", sort, ["active"]);

    const sortBy = sort.dataset.sort;

    filterCourses =
      sortBy == "cheapest"
        ? filterCourses
            .sort((a, b) => {
              return a.price - b.price;
            })
            .filter((course) => {
              return !course.isFree;
            })
        : sortBy == "expensive"
        ? filterCourses
            .sort((a, b) => {
              return b.price - a.price;
            })
            .filter((course) => {
              return !course.isFree;
            })
        : sortBy == "popular"
        ? [...coursesBackup].sort((a, b) => {
            return b.studentsCount - a.studentsCount;
          })
        : [...coursesBackup];

    loadCourses(filterCourses);
  });
});

// Sort Courses

mobileSortValues.forEach((sort) => {
  sort.addEventListener("click", (element) => {
    sortValues.forEach((e) => {
      _changeClasses("remove", e, ["active"]);
    });
    _changeClasses("add", sort, ["active"]);

    mobileSortOpenBtnText.innerHTML = sort.children[0].innerHTML;

    const sortBy = sort.dataset.sort;

    filterCourses =
      sortBy == "cheapest"
        ? filterCourses
            .sort((a, b) => {
              return a.price - b.price;
            })
            .filter((course) => {
              return !course.isFree;
            })
        : sortBy == "expensive"
        ? filterCourses
            .sort((a, b) => {
              return b.price - a.price;
            })
            .filter((course) => {
              return !course.isFree;
            })
        : sortBy == "popular"
        ? [...coursesBackup].sort((a, b) => {
            return b.studentsCount - a.studentsCount;
          })
        : [...coursesBackup];

    loadCourses(filterCourses);
    console.log("object");
  });
});

// load Courses

const loadCourses = (courses) => {
  courseContainer.innerHTML = "";
  courses.forEach((course) => {
    courseContainer.insertAdjacentHTML("beforeend", createCourseCard(course));
  });
};

window.addEventListener("load", async () => {
  getParams();
  changeCategoryTitle();
  await getCourses();
  getAndShowCourses();
});
