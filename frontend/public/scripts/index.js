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
