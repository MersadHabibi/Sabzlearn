import * as Converter from "persian-currency-converter";

let isFree = false;
let price = 1000000;

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
    titlePreview.innerText = "نام دوره...";
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

const categoryPreviewHandler = elem => {
  const categoryPreview = document.querySelector(".preview__category");
  console.log(elem);
};

const teacherPreviewHandler = elem => {
  const teacherPreview = document.querySelector(".preview__teacher");
  if (elem.value) {
    teacherPreview.innerText =
      elem.value == "SaeidiRad"
        ? "محمد امین سعیدی راد"
        : elem.value == "barati"
        ? "مهرشاد براتی"
        : elem.value == "ebadi"
        ? "حمیدرضا عبادی"
        : elem.value == "rezaDolati"
        ? "رضا دولتی"
        : "غیره...";
  } else {
    teacherPreview.innerText = "مدرس";
  }
};

const pricePreviewHandler = elem => {
  const pricePreview = document.querySelector(".preview__price");
  price = elem.value ? elem.value : 1000000;
  console.log(price);
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
  console.log(isFree);
  pricePreview.innerHTML = isFree
    ? `<div class="">
          <del class="block text-zinc-700/70 dark:text-slate-400/70 text-base/3 xs:text-lg/3 mb-1.5"> ${price} </del>
          <span class="xs:font-DanaMedium text-lg xs:text-2xl">رایگان!</span>
        </div>`
    : `
        <div class="flex gap-x-1 items-center">
          <span class="text-lg xs:text-2xl"> ${price} </span>
          <svg class="size-4 xs:size-6">
            <use href="#toman"></use>
          </svg>
        </div>`;
};

export default createCoursePreview;
