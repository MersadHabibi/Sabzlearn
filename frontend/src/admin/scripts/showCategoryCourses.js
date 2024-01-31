import { _changeClasses, api } from "../../scripts/funcs/utils";
import createCourseCard from "../../scripts/funcs/createCourseCard";

const overlay = document.querySelector(".overlay");

const showCategoryCourses = async elem => {
  const viewCoursesModal = document.querySelector("#view-courses-modal");
  const coursesContainer = document.querySelector("#courses__container");

  // open modal
  _changeClasses("add", viewCoursesModal, ["show"]);
  _changeClasses("add", overlay, ["show"]);

  //
  coursesContainer.innerHTML = `<div class="loader mx-auto my-3 sm:col-span-2 lg:col-span-3 xl:col-span-4 xxl:col-span-5"></div>`;

  const courses = await getCourses(elem.dataset.categoryId);

  coursesContainer.innerHTML =
    courses.length == 0
      ? "<p class='text-xl text-center dark:text-white sm:col-span-2 lg:col-span-3 xl:col-span-4 xxl:col-span-5'> دوره ای وجود ندارد </p>"
      : "";

  courses?.forEach(course => {
    console.log(course);
    coursesContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div
        class="course-card flex flex-col bg-gray-100 dark:bg-gray-800 shadow-light dark:shadow-none border border-gray-300 dark:border-gray-700 h-fit overflow-hidden rounded-2xl">
        <!-- Course Head -->
        <a href="./course.html" class="relative block h-42 w-full overflow-hidden">
          <img src="http://localhost:3000/public/images/a758f704-1702923511505.png" class="w-full h-full object-cover rounded-2xl" alt="" />
        </a>
        <!-- Course Body -->
        <div class="px-5 pt-2.5 flex-grow">
          <a href="./course.html" class="font-DanaMedium dark:text-white text-lg line-clamp-2 my-2 h-14">
            تکنیک های قیمت گذاری پروژه های فریلنسری
          </a>
        </div>
        <!-- Course Footer -->
        <div class="px-5 pb-2 pt-1">
          <!-- Course Info -->
          <div class="flex justify-between text-xs pb-3 border-b border-b-gray-100 dark:border-b-gray-700">
            <div class="flex gap-x-2 text-slate-500 dark:text-slate-400">
              <a href="#" class="flex items-center gap-x-1 hover:text-primary transition-colors">
                <svg class="w-4 h-4">
                  <use href="#user"></use>
                </svg>
                <span> محمد امین سعیدی راد </span>
              </a>
              <span class="flex items-center gap-x-1">
                <svg class="w-4 h-4">
                  <use href="#clock"></use>
                </svg>
                <span>00:00</span>
              </span>
            </div>
            <div class="flex items-center gap-x-1 text-amber-400">
              <span class="leading-[1px] mt-1">5.0</span>
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
              <span> 13 </span>
            </div>
            <!-- Course Price -->
            <div class="text-primary">
              <!-- Normal Price -->
              <div class="flex gap-x-1 items-center">
                <span class="text-xl"> 285000 </span>
                <svg class="w-4 h-4">
                  <use href="#toman"></use>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      ${createCourseCard(course, { hasDescription: false, hasCategory: false })}
    `
    );
  });
};

const getCourses = async id => {
  try {
    const res = await api.get(`courses/category/${id}`);
    const courses = res.data;

    return courses;
  } catch (err) {
    return null;
  }
};

export default showCategoryCourses;
