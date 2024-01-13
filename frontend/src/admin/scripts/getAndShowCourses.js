import { _changeClasses, api, apiAdmin, fullScreenLoader, showNotif } from "../../scripts/funcs/utils";
import changeContent from "./changeContents";

let courseIdForDelete = null;

const getAndShowCourses = async () => {
  const coursesContainer = document.querySelector(".courses__container");

  const courses = await api
    .get("courses")
    .then(res => res.data)
    .catch(err => null);

  courses == null && showNotif("دوره ای پیدا نشد");

  coursesContainer.innerHTML = "";
  courses.forEach(course => {
    coursesContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div data-course-id=${course.id} class="course-card flex flex-col">
        <div
          data-course-id="65808a6927251f1e5a860db1"
          class="course-card flex flex-col bg-gray-100/50 dark:bg-gray-700 border !border-b-transparent border-gray-300/80  dark:border-gray-600 dark:shadow-none overflow-hidden rounded-t-xl flex-1">
          <!-- Course Head -->
          <a href="../course.html" class="relative block h-42 w-full overflow-hidden">
            <img  src=http://localhost:3000/${course.image} class="w-full h-full object-cover rounded-xl" alt="" />
          </a>
          <!-- Course Body -->
          <div class="px-5 pt-3.5 flex-grow">
            <div class="flex justify-start items-center gap-1">
              <a
                href=../categories.html?category=${course.category}
                class="inline-flex items-center justify-center text-xs py-1 px-1.5 text-sky-500 dark:text-yellow-400 bg-sky-500/10 dark:bg-yellow-400/10 rounded"> ${
                  course.category == "frontend"
                    ? "فرانت اند"
                    : course.category == "python"
                    ? "پایتون"
                    : course.category == "softskills"
                    ? "مهارت های نرم"
                    : course.category == "security"
                    ? "امنیت"
                    : "غیره..."
                } </a>
            </div>
            <a href="./course.html" class="font-DanaMedium dark:text-white text-lg line-clamp-2 my-2"> ${course.title} </a>
            <p
              class="line-clamp-2 font-light text-sm text-slate-500 dark:text-slate-400 mb-3">
              ${course.description}
            </p>
          </div>
          <!-- Course Footer -->
          <div class="px-5 pb-2">
            <!-- Course Info -->
            <div class="flex justify-between text-xs pb-3 border-b border-b-gray-200 dark:border-b-gray-600">
              <div class="flex gap-x-2 text-slate-500 dark:text-slate-400">
                <a href="#" class="flex items-center gap-x-1 hover:text-primary transition-colors">
                  <svg class="w-4 h-4">
                    <use href="#user"></use>
                  </svg>
                  <span> ${
                    course.teacher == "SaeidiRad"
                      ? "محمد امین سعیدی راد"
                      : course.teacher == "barati"
                      ? "مهرشاد براتی"
                      : course.teacher == "ebadi"
                      ? "حمیدرضا عبادی"
                      : course.teacher == "rezaDolati"
                      ? "رضا دولتی"
                      : "غیره..."
                  } </span>
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
                <span> ${course.studentsCount} </span>
              </div>
              <!-- Course Price -->
              <div class="text-primary">
              ${
                course.isFree
                  ? `
                <!-- Free Price -->
                <div class="">
                  <del
                    class="block text-zinc-700/70 dark:text-slate-400/70 text-sm/4 -mb-1">
                      ${course.price}
                    </del>
                  <span class="font-DanaMedium text-xl">رایگان!</span>
                </div>
              `
                  : course.discount
                  ? `
                <!-- Offer Price -->
                <div class="">
                  <del
                    class="block text-zinc-700/70 dark:text-slate-400/70 text-sm/4 -mb-1">
                      ${course.price}
                    </del>
                  <span
                    class="flex items-center gap-x-1 font-DanaMedium text-xl">
                      ${course.discountPrice}
                    <svg class="w-4 h-4">
                      <use href="#toman"></use>
                    </svg>
                  </span>
                </div>
              `
                  : `
                <!-- Normal Price -->
                <div class="flex gap-x-1 items-center">
                  <span class="text-xl"> ${course.price} </span>
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
        <div
          data-course-id=${course.id}
          class="w-full p-2 rounded-b-xl bg-gray-200 dark:bg-gray-900/30 border-gray-300/80 border !border-t-transparent dark:border-gray-600 flex flex-wrap gap-2">

          <button class="edit-description-course-btn bg-primary hover:bg-green-600  text-white font-DanaMedium py-2 rounded-md transition w-full "> ویرایش توضیحات </button>
          <button class="edit-topics-btn bg-secondry bg-blue-500 hover:bg-blue-600 w-full text-white font-DanaMedium py-2 rounded-md transition "> مدیریت سر فصل ها </button>
          <button class="bg-gray-500 hover:bg-gray-600/65 text-white font-DanaMedium py-2 rounded-md transition flex-1"> ویرایش اطلاعات</button>
          <button class="delete-course-btn bg-red-500 hover:bg-red-600 text-white font-DanaMedium py-2 rounded-md transition flex-1">حذف</button>
        </div>
      </div>
    `
    );
  });

  setButtonsEvent();
};

const setButtonsEvent = () => {
  const deleteCourseBtns = document.querySelectorAll(".delete-course-btn");
  const editTopicsBtn = document.querySelectorAll(".edit-topics-btn");
  const editDescriptionCourseBtn = document.querySelectorAll(".edit-description-course-btn");
  const modalDeleteCourseBtn = document.querySelector(".modal-delete-course-btn");
  const modalCancelDeleteCourseBtn = document.querySelector(".modal-cancel-delete-course-btn");

  // Delete Course

  deleteCourseBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      courseIdForDelete = btn.parentElement.dataset.courseId;
      _changeClasses("add", document.querySelector("#delete-course-modal"), ["show"]);
      _changeClasses("add", document.querySelector(".overlay"), ["show"]);
    });
  });
  modalDeleteCourseBtn.addEventListener("click", async () => {
    fullScreenLoader("loading");
    await deleteCourse(courseIdForDelete);
    fullScreenLoader("loaded");
    _changeClasses("remove", document.querySelector("#delete-course-modal"), ["show"]);
    _changeClasses("remove", document.querySelector(".overlay"), ["show"]);
  });
  modalCancelDeleteCourseBtn.addEventListener("click", () => {
    _changeClasses("remove", document.querySelector("#delete-course-modal"), ["show"]);
    _changeClasses("remove", document.querySelector(".overlay"), ["show"]);
  });

  // Edit Topic

  editTopicsBtn.forEach(btn => {
    btn.addEventListener("click", () => {
      const menuItems = document.querySelectorAll(".panel-menu__item");

      menuItems.forEach(item => {
        if (item.dataset.content === "topics") {
          _changeClasses("remove", document.querySelector(".menu__item.active"), ["active"]);
          _changeClasses("add", item, ["active"]);
        }
      });
      changeContent("topics", btn.parentElement.dataset.courseId);
    });
  });

  // Edit Description

  editDescriptionCourseBtn.forEach(btn => {
    btn.addEventListener("click", () => {
      changeContent("description", btn.parentElement.dataset.courseId);
    });
  });
};

const deleteCourse = async courseId => {
  await apiAdmin
    .delete(`courses/${courseId}`)
    .then(res => {
      showNotif("دوره با موفقیت حذف شد", "success");
      getAndShowCourses();
    })
    .catch(err => {
      showNotif("مشکلی در حذف دوره به وجود آمده ! دوباره امتحان کنید");
    });
};

export default getAndShowCourses;
