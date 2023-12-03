import { _changeClasses, createTimer, getCourses } from "./funcs/utils.js";

const $ = document;

// Load Course

const getAndShowCourse = async () => {
  const targetCourseQuery = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  }).courseName;

  const courses = await getCourses();

  const targetCourse = courses.filter((e) => {
    return e.shortName == targetCourseQuery;
  })[0];

  // breadcrumb
  $.querySelectorAll(".breadcrumb__item")[2].innerHTML =
    targetCourse.categoryID.name == "frontend"
      ? "فرانت اند"
      : targetCourse.categoryID.name == "backend"
      ? "بک اند"
      : targetCourse.categoryID.name == "security"
      ? "امنیت"
      : targetCourse.categoryID.name == "softskills"
      ? "مهارت های نرم"
      : "";
  $.querySelectorAll(".breadcrumb__item")[3].innerHTML = targetCourse.name;

  // Header
  $.querySelector(".course__name").innerHTML = targetCourse.name;
  $.querySelector(".course__description").innerHTML = targetCourse.description;
  if (targetCourse.discount) {
    createTimer(offerDay, offerHur, offerMin, offerSec, "0:24:0:0", false);
    _changeClasses("remove", $.querySelector(".offer"), ["!hidden"]);
    if (targetCourse.price) {
      $.querySelector(".offer__percent").innerHTML = targetCourse.discount + "%";
    } else {
      $.querySelector(".offer__percent").innerHTML = "100%";
    }
  }
  $.querySelector(".course__price").insertAdjacentHTML(
    "beforeend",
    `
  ${
    !targetCourse.price
      ? ` 
      <div class="flex items-center gap-x-2">
        <span class="font-DanaDemiBold mt-2 text-3xl dark:text-white"> رایگان! </span>
      </div>
      `
      : targetCourse.price && targetCourse.discount
      ? `
      <div class="flex items-center gap-x-2">
        <span
          class="relative block text-slate-500 dark:text-slate-400 text-2xl -mb-1 pt-1.5 before:content-[''] before:absolute before:inset-0 before:m-auto before:h-[1px] before:w-full before:bg-slate-500 dark:before:bg-slate-400"
          >${targetCourse.price + (targetCourse.price / 100) * targetCourse.discount}</span
        >
        <span class="flex items-center gap-x-1 font-DanaDemiBold mt-1 text-3xl dark:text-white">
          <span class="mt-2">  ${targetCourse.price} </span>
          <svg class="w-6 h-6">
            <use href="#toman"></use>
          </svg>
        </span>
      </div>
      `
      : `
      <div class="flex gap-x-1 items-center font-DanaDemiBold dark:text-white">
        <span class="text-3xl mt-1">${targetCourse.price}</span>
        <svg class="w-6 h-6">
          <use href="#toman"></use>
        </svg>
      </div>
      
`
  }
  `
  );
  $.querySelector(".course__cover").src = `images/${targetCourse.cover}`;

  console.log(targetCourse.categoryID.name);
};
getAndShowCourse();

// Description Elements

const courseDescription = $.querySelector(".course-description");
const courseDescriptionBtn = $.querySelector(".course-description__btn");

// Copy Link Element

const copyLinkBtn = $.querySelector(".copy-link-btn");

// Topics Elements

const topicsHeader = $.querySelectorAll(".topic__header");

// New Comment Elements

const courseComments = $.querySelector(".course-comments");
const openNewCommentBtn = $.querySelector(".open-new-comment-btn");
const cancelNewCommentBtn = $.querySelector(".cancel-new-comment");
const replayCommentBtn = $.querySelectorAll(".comment-reply-btn");
const commentTo = $.querySelector(".comment-to");

// Offer Elements

const offerDay = $.querySelector(".offer__day");
const offerHur = $.querySelector(".offer__hur");
const offerMin = $.querySelector(".offer__min");
const offerSec = $.querySelector(".offer__sec");

// Course Description - show & hide

courseDescriptionBtn.addEventListener("click", () => {
  _changeClasses("toggle", courseDescription, ["show"]);
});

// Copy Link Btn

copyLinkBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(copyLinkBtn.nextElementSibling.innerText);
});

// Course Topic - open & close

topicsHeader.forEach((topicHeader) => {
  topicHeader.addEventListener("click", () => {
    _changeClasses("toggle", topicHeader.parentElement, ["open"]);
  });
});

// New Comment - open

openNewCommentBtn.addEventListener("click", () => {
  _changeClasses("add", courseComments, ["show-new-comment-form"]);
  commentTo.innerText = `ثبت نظر جدید`;
});

// New Comment - close

cancelNewCommentBtn.addEventListener("click", () => {
  _changeClasses("remove", courseComments, ["show-new-comment-form"]);
});

// Replay Comment - open

replayCommentBtn.forEach((replayBtn) => {
  replayBtn.addEventListener("click", () => {
    let commentToName =
      replayBtn.parentElement.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.innerText;
    commentTo.innerText = `در پاسخ به ${commentToName}`;
    _changeClasses("add", courseComments, ["show-new-comment-form"]);
  });
});
