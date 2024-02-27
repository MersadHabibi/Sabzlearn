import { _changeClasses, api } from "../../scripts/funcs/utils";
import createCourseCard, {
  courseClickHandler,
  categoryClickHandler,
} from "../../scripts/funcs/createCourseCard";
import { getCoursesByCategoryId } from "../../../services/coursesAPIs";

const overlay = document.querySelector(".overlay");

const showCategoryCourses = async (id) => {
  const viewCoursesModal = document.querySelector("#view-courses-modal");
  const coursesContainer = document.querySelector("#courses__container");

  // open modal
  _changeClasses("add", viewCoursesModal, ["show"]);
  _changeClasses("add", overlay, ["show"]);

  //
  coursesContainer.innerHTML = `<div class="loader mx-auto my-3 sm:col-span-2 lg:col-span-3 xl:col-span-4 xxl:col-span-5"></div>`;

  const courses = (await getCoursesByCategoryId(id)).courses;

  console.log(courses);

  coursesContainer.innerHTML = "";

  courses === null &&
    (coursesContainer.innerHTML =
      "<p class='text-xl text-center dark:text-white sm:col-span-2 lg:col-span-3 xl:col-span-4 xxl:col-span-5'> دوره ای وجود ندارد </p>");

  courses?.forEach((course) => {
    console.log(course);
    coursesContainer.insertAdjacentHTML(
      "beforeend",
      `
      ${createCourseCard(course, { hasDescription: false, hasCategory: false })}
    `,
    );
  });

  window.categoryClickHandler = categoryClickHandler;
  window.courseClickHandler = courseClickHandler;
};

export default showCategoryCourses;
