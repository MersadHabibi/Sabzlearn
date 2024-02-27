import { courseClickHandler } from "../funcs/createCourseCard";
import { BASE_URL } from "../funcs/utils";

const myCourses = user => {
  const coursesContainer = document.querySelector("#courses__container");

  // if User Not Have Course
  if (!user.courses.length) {
    coursesContainer.innerHTML = `<p class="dark:text-white text-xl xs:col-span-2 lg:col-span-3 text-center font-DanaMedium mt-5"> شما در هیچ دوره ای ثبت نام نکردید </p>`;
    return;
  }

  // if User Have Course
  coursesContainer.innerHTML = "";

  user.courses.forEach(course => {
    coursesContainer.insertAdjacentHTML(
      "beforeend",
      `
    <div onclick="courseClickHandler('${course.id}')"
      class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-light dark:shadow-none dark:border dark:border-gray-700 dark:text-white">
      <a href="../course.html" class="block w-full rounded-2xl overflow-hidden">
        <img src="${BASE_URL}/${course.image}" class="h-full w-full object-cover" alt="" />
      </a>
      <div class="px-5 py-2.5 flex-grow">
        <a href="../course.html" class="font-DanaMedium line-clamp-2"> ${course.title} </a>
        <div class="flex flex-col pb-1 pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
          <div class="flex justify-between text-xs">
            <span>میزان مشاهده</span>
            <span>0%</span>
          </div>
          <progress value="20" max="100" class="h-1 w-full mt-2 dark:bg-gray-700"></progress>
        </div>
      </div>
    </div>  
    `
    );
  });

  // Show Free And Not Free Courses Count
  const freeCoursesCount = user.courses.reduce((prev, next) => {
    if (next.isFree === true) return 1;
    else return 0;
  }, 0);

  document.querySelector("#not-free-courses").innerHTML = `${user.courses.length - freeCoursesCount} دوره`;
  document.querySelector("#free-courses").innerHTML = `${freeCoursesCount} دوره`;

  window.courseClickHandler = courseClickHandler;
};

export default myCourses;
