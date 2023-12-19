import { createCourseCard } from "./funcs/share.js";
import { api } from "./funcs/utils.js";

const $ = document;

// New Courses

const newCoursesSliderPrevBtn = $.querySelector(".new-courses-slider-prev");
const newCoursesSliderNextBtn = $.querySelector(".new-courses-slider-next");

// Presell Courses

const presellCoursesSliderPrevBtn = $.querySelector(
  ".presell-courses-slider-prev"
);
const presellCoursesSliderNextBtn = $.querySelector(
  ".presell-courses-slider-next"
);

// Slider Config

const slidersConfig = {
  slidesPerView: 1,
  loop: true,
  autoplay: {
    delay: 2000,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1280: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
};

// New Course Slider

const newCoursesSlider = new Swiper(".new-courses .mySwiper", slidersConfig);

newCoursesSliderNextBtn.addEventListener("click", () => {
  newCoursesSlider.slideNext();
});

newCoursesSliderPrevBtn.addEventListener("click", () => {
  newCoursesSlider.slidePrev();
});

// Presell Courses Slider

const presellCoursesSlider = new Swiper(
  ".presell-courses .mySwiper",
  slidersConfig
);

presellCoursesSliderNextBtn.addEventListener("click", () => {
  presellCoursesSlider.slideNext();
});

presellCoursesSliderPrevBtn.addEventListener("click", () => {
  presellCoursesSlider.slidePrev();
});

// Get Course

const res = await fetch(`${api}admin/courses`);
let courses = await res.json();

// Get And Show Last Courses - random

const getAndShowLastCourses = async () => {
  const lastCoursesContainer = $.querySelector(".last-courses__container");

  let rndCourses = [...courses];

  rndCourses = rndCourses.sort(() => Math.random() - 0.5);

  rndCourses.slice(0, 8).forEach((course) => {
    lastCoursesContainer.insertAdjacentHTML(
      "beforeend",
      createCourseCard(course, "last-courses")
    );
  });
};
getAndShowLastCourses();

// Get And Show New Courses

const getAndShowNewCourses = async () => {
  const newCoursesContainer = $.querySelector(".new-courses__container");

  courses.slice(0, 8).forEach((course) => {
    newCoursesContainer.insertAdjacentHTML(
      "beforeend",
      `
          ${createCourseCard(course, "new-courses")}
      `
    );
  });
};
getAndShowNewCourses();

// Get And Show New Courses

const getAndShowPresellCourses = async () => {
  const presellCoursesContainer = $.querySelector(
    ".presell-courses__container"
  );

  const presellCourses = courses.filter((course) => {
    return course.status == "presell";
  });

  presellCourses.forEach((course) => {
    presellCoursesContainer.insertAdjacentHTML(
      "beforeend",
      `
          ${createCourseCard(course, "new-courses")}
      `
    );
  });
};
getAndShowPresellCourses();

// Get And Show Popular Courses

const getAndShowPopularCourses = async () => {
  const popularCoursesContainer = $.querySelector(
    ".popular-courses__container"
  );

  let popularCourses = [...courses];

  popularCourses = popularCourses.sort((a, b) => {
    return b.studentsCount - a.studentsCount;
  });

  popularCourses.slice(0, 8).forEach((course) => {
    popularCoursesContainer.insertAdjacentHTML(
      "beforeend",
      `
          ${createCourseCard(course, "last-courses", false, false)}
      `
    );
  });
};
getAndShowPopularCourses();
