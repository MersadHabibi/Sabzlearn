import * as Converter from "persian-currency-converter";
import { getTeacherName } from "../../scripts/funcs/utils";
import { getAllCategories } from "../../../services/categoriesAPIs";

let isFree = false;
let price = "0000000";

const createCoursePreview = () => {
  window.titlePreviewHandler = titlePreviewHandler;
  window.descriptionPreviewHandler = descriptionPreviewHandler;
  window.categoryPreviewHandler = categoryPreviewHandler;
  window.teacherPreviewHandler = teacherPreviewHandler;
  window.pricePreviewHandler = pricePreviewHandler;
  window.isFreePreviewHandler = isFreePreviewHandler;
};

const titlePreviewHandler = elem => {
  const titlePreview = document.querySelector(".preview__title");
  if (elem.value) {
    titlePreview.innerText = elem.value;
  } else {
    titlePreview.innerText = "نام دوره";
  }
};

const descriptionPreviewHandler = elem => {
  const descriptionPreview = document.querySelector(".preview__description");
  if (elem.value) {
    descriptionPreview.innerText = elem.value;
  } else {
    descriptionPreview.innerText = "توضیحات دوره";
  }
};

const categoryPreviewHandler = async elem => {
  const categoryPreview = document.querySelector(".preview__category");

  if (elem.value) {
    categoryPreview.innerText = "loading...";

    const categories = await getAllCategories();

    const categoryTarget = categories.filter(category => category.categoryId == elem.value);
    categoryPreview.innerText = categoryTarget[0].categoryName;
  } else {
    categoryPreview.innerText = "دسته بندی";
  }
};

const teacherPreviewHandler = elem => {
  const teacherPreview = document.querySelector(".preview__teacher");
  if (elem.value) {
    teacherPreview.innerText = getTeacherName(elem.value);
  } else {
    teacherPreview.innerText = "مدرس";
  }
};

const pricePreviewHandler = elem => {
  const pricePreview = document.querySelector(".preview__price");
  price = elem.value ? elem.value : "0000000";
  if (price) {
    pricePreview.innerHTML = isFree
      ? `<div class="">
          <del class="block text-zinc-700/70 dark:text-slate-400/70 text-base/3 xs:text-lg/3 mb-1.5"> ${Converter.threeDigitSeparator(price)} </del>
          <span class="xs:font-DanaMedium text-lg xs:text-2xl">رایگان!</span>
        </div>`
      : `
        <div class="flex gap-x-1 items-center">
          <span class="text-lg xs:text-2xl"> ${Converter.threeDigitSeparator(price)} </span>
          <svg class="size-4 xs:size-6">
            <use href="#toman"></use>
          </svg>
        </div>`;
  } else {
    // pr
  }
};

const isFreePreviewHandler = elem => {
  const pricePreview = document.querySelector(".preview__price");
  isFree = /^true$/i.test(elem.value);
  pricePreview.innerHTML = isFree
    ? `<div class="">
          <del class="block text-zinc-700/70 dark:text-slate-400/70 text-base/3 xs:text-lg/3 mb-1.5"> ${Converter.threeDigitSeparator(price)} </del>
          <span class="xs:font-DanaMedium text-lg xs:text-2xl">رایگان!</span>
        </div>`
    : `
        <div class="flex gap-x-1 items-center">
          <span class="text-lg xs:text-2xl"> ${Converter.threeDigitSeparator(price)} </span>
          <svg class="size-4 xs:size-6">
            <use href="#toman"></use>
          </svg>
        </div>`;
};

export default createCoursePreview;
export { titlePreviewHandler, descriptionPreviewHandler, categoryPreviewHandler, teacherPreviewHandler, pricePreviewHandler, isFreePreviewHandler };
