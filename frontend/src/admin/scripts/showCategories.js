import { _changeClasses, api, apiAdmin, showNotif } from "../../scripts/funcs/utils";
import showCategoryCourses from "./showCategoryCourses";

const showCategories = async () => {
  const categoriesContainer = document.querySelector("#categories__container");

  const categories = await getCategories();

  categoriesContainer.innerHTML =
    categories?.length == 0 || !categories
      ? "<p class='xs:col-span-2 lg:col-span-3 xl:col-span-4 xxl:col-span-5 text-xl dark:text-white text-center py-2'> دسته بندی ای پیدا نشد. </p>"
      : "";
  categories?.forEach(category => {
    categoriesContainer.insertAdjacentHTML(
      "beforeend",
      `
    <div class="bg-gray-100 dark:bg-gray px-2 pt-1 rounded-lg dark:text-white">
      <!-- category name -->
      <div class="w-full text-center text-xl font-DanaMedium py-4 border-b border-gray-300 dark:border-gray-700">
        <span> ${category.categoryName} </span>
      </div>
      <!-- category info -->
      <div class="flex justify-between items-center w-full text-center text-lg py-2 px-2 border-b border-gray-300 dark:border-gray-700">
        <p class="flex items-center gap-x-2">
          <svg class="size-6">
            <use href="#users"></use>
          </svg>
          <span class="mt-1"> 4353 </span>
        </p>
        <p class="flex items-center gap-x-2">
          <svg class="size-6">
            <use href="#video-camera"></use>
          </svg>
          <span class="mt-1"> 12 </span>
        </p>
      </div>
      <!-- category btns -->
      <div class="flex justify-between items-center w-full text-center text-lg py-2">
        <button onclick="showCategoryCourses('${category.categoryId}')" class="bg-secondary hover:bg-sky-600 w-full py-2 text-lg font-DanaMedium rounded-md text-white transition-colors">
          لیست دوره ها
        </button>
      </div>
    </div>
    `
    );
  });

  window.showCategoryCourses = showCategoryCourses;
  window.closeViewCoursesModal = closeViewCoursesModal;
};

const getCategories = async () => {
  try {
    const res = await api.get("categories");
    const categories = res.data;

    console.log(res);

    return categories;
  } catch (err) {
    console.log(err);
    showNotif("اینترنت خود را بررسی کنید!");
    return null;
  }
};

const closeViewCoursesModal = () => {
  _changeClasses("remove", document.querySelector("#view-courses-modal"), ["show"]);
  _changeClasses("remove", document.querySelector(".overlay"), ["show"]);
};

export default showCategories;
export { getCategories };
