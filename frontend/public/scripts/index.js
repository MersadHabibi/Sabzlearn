import { BackendApi } from "./funcs/utils.js";

const $ = document;

// New Courses

const newCoursesSliderPrevBtn = $.querySelector(".new-courses-slider-prev");
const newCoursesSliderNextBtn = $.querySelector(".new-courses-slider-next");

// Presell Courses

const presellCoursesSliderPrevBtn = $.querySelector(".presell-courses-slider-prev");
const presellCoursesSliderNextBtn = $.querySelector(".presell-courses-slider-next");

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

const presellCoursesSlider = new Swiper(".presell-courses .mySwiper", slidersConfig);
presellCoursesSliderNextBtn.addEventListener("click", () => {
  presellCoursesSlider.slideNext();
});
presellCoursesSliderPrevBtn.addEventListener("click", () => {
  presellCoursesSlider.slidePrev();
});

// Get Courses Random - Last Courses Section

const getCoursesForLastCourseSection = async () => {
  const lastCoursesContainer = $.querySelector("#last-courses__container");

  const res = await fetch(`${BackendApi}/courses`);
  const courses = await res.json();

  courses.slice(0, 12).forEach((course) => {
    lastCoursesContainer.insertAdjacentHTML(
      "beforeend",
      `
        <div
          class="flex flex-col bg-white dark:bg-gray-800 shadow-light dark:shadow-none dark:border border-gray-700 overflow-hidden rounded-2xl">
          <!-- Course Head -->
          <a href=./course.html?courseName=${course.shortName} class="relative block h-42 w-full overflow-hidden">
            ${
              course.discount
                ? `
                <span
                  class="flex items-center justify-center w-12 h-6 absolute top-2 right-2 text-sm text-white bg-primary rounded-full"
                > ${course.discount}% </span
            >`
                : ""
            }
            <img src="images/course-1.webp" class="w-full h-full object-cover rounded-2xl" alt="" />
          </a>
          <!-- Course Body -->
          <div class="px-5 pt-2.5 pb-3.5 flex-grow">
            <div class="flex justify-start items-center gap-1">
              <a
                href="#"
                class="inline-flex items-center justify-center text-xs py-1 px-1.5 text-sky-500 dark:text-yellow-400 bg-sky-500/10 dark:bg-yellow-400/10 rounded"
                >فرانت اند</a
              >
            </div>
            <a href=./course.html?courseName=${course.shortName} class="font-DanaMedium dark:text-white line-clamp-2 my-2.5"> ${
        course.name
      } </a>
            <p class="line-clamp-2 font-light text-sm text-slate-500 dark:text-slate-400"> ${course.description} </p>
          </div>
          <!-- Course Footer -->
          <div class="px-5 pb-2">
            <!-- Course Info -->
            <div class="flex justify-between text-xs pb-3 border-b border-b-gray-100 dark:border-b-gray-700">
              <div class="flex gap-x-2 text-slate-500 dark:text-slate-400">
                <a href="#" class="flex items-center gap-x-1 hover:text-primary transition-colors">
                  <svg class="w-4 h-4">
                    <use href="#user"></use>
                  </svg>
                  <span> ${course.creator} </span>
                </a>
                <span class="flex items-center gap-x-1">
                  <svg class="w-4 h-4">
                    <use href="#clock"></use>
                  </svg>
                  <span>00:00</span>
                </span>
              </div>
              <div class="flex items-center gap-x-1 text-amber-400">
                <span class="leading-[1px] mt-1">${course.courseAverageScore}.0</span>
                <svg class="w-4 h-4">
                  <use href="#star"></use>
                </svg>
              </div>
            </div>
            <!-- Course Bottom -->
            <div class="flex justify-between items-end mt-1.5">
              <div class="dark:text-white flex gap-x-1 items-center">
                <svg class="w-5 h-5">
                  <use href="#users"></use>
                </svg>
                <span> ${course.registers} </span>
              </div>
              <!-- Course Price -->
              <div class="text-primary"> ${
                !course.price
                  ? ` <div class="">
                        <span class="font-DanaMedium text-xl">رایگان!</span>
                      </div>`
                  : course.price && course.discount
                  ? `<div class="">
                      <del class="block text-zinc-700/70 dark:text-slate-400/70 text-sm/4 -mb-1"> ${
                        course.price + (course.price / 100) * course.discount
                      } </del>
                      <span class="flex items-center gap-x-1 font-DanaMedium text-xl">
                        ${course.price}
                        <svg class="w-4 h-4">
                          <use href="#toman"></use>
                        </svg>
                      </span>
                    </div>`
                  : `
                  <div class="flex gap-x-1 items-center">
                    <span class="text-xl">420,000</span>
                    <svg class="w-4 h-4">
                      <use href="#toman"></use>
                    </svg>
                  </div>
            `
              }
                
              </div>
            </div>
          </div>
        </div>
    `
    );
    console.log(course.shortName);
  });

  console.log(courses.slice(0, 8));
};
getCoursesForLastCourseSection();
