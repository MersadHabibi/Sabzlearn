import "../styles/app.css";
import "./share.js";
import header from "./header.js";
import { _changeClasses, api, createTimer } from "./funcs/utils.js";

const $ = document;
header($);
let course = null;

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

topicsHeader.forEach(topicHeader => {
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

replayCommentBtn.forEach(replayBtn => {
  replayBtn.addEventListener("click", () => {
    let commentToName = replayBtn.parentElement.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.innerText;
    commentTo.innerText = `در پاسخ به ${commentToName}`;
    _changeClasses("add", courseComments, ["show-new-comment-form"]);
  });
});

// Create Timer

createTimer(offerDay, offerHur, offerMin, offerSec, "0:14:10:3", false);

// Get Course

const getCourse = async () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const res = await fetch(`${api}admin/courses`);
  const courses = await res.json();

  course = params.course
    ? courses.filter(c => {
        return c.shortName == params.course;
      })[0]
    : null;
};

// BreadCrumb

const fillBreadCrumb = () => {
  const breadCrumbCategory = $.querySelector("#breadCrumb__category");
  const breadCrumbName = $.querySelector("#breadCrumb__name");

  breadCrumbCategory.innerHTML = `<a href=./categories.html?category=${course.category}> ${
    course.category == "frontend"
      ? "فرانت اند"
      : course.category == "python"
      ? "پایتون"
      : course.category == "security"
      ? "امنیت"
      : course.category == "softskills"
      ? "مهارت های نرم"
      : "غیره..."
  } </a>`;

  breadCrumbName.innerHTML = course.title;
};

// Set Datas = image - title - description - price - offer - time - teacher - studentsCount

const setDatas = () => {
  const courseImage = $.querySelector(".course__image");
  const courseTitle = $.querySelector(".course__title");
  const courseDescription = $.querySelector(".course__description");
  const coursePrice = $.querySelector(".course__price");
  const courseOffer = $.querySelector(".course__offer");
  const courseOfferPercent = $.querySelector(".course__offer-percent");
  const courseStudentsCount = $.querySelector(".course__studentsCount");
  const mobileCourseStudentsCount = $.querySelector(".mobile-course__studentsCount");
  const courseStatus = $.querySelector(".course__status");
  const courseTime = $.querySelector(".course__time");
  const courseTeacher = $.querySelector(".course__teacher");
  const mobileCourseTeacher = $.querySelector(".mobile-course__teacher");

  // Image

  courseImage.src = `http://localhost:3000/${course.image}`;
  courseImage.alt = course.title;
  _changeClasses("remove", courseImage, ["hidden"]);

  // Title and Description

  courseTitle.innerHTML = course.title;
  courseDescription.innerHTML = course.description;

  // Offer

  if (course.discount) {
    _changeClasses("remove", courseOffer, ["!hidden"]);
    courseOfferPercent.innerHTML = `${course.discount}%`;
  } else if (course.isFree) {
    _changeClasses("remove", courseOffer, ["!hidden"]);
    courseOfferPercent.innerHTML = "100%";
  }

  // Price

  coursePrice.innerHTML = course.isFree
    ? `
    <div class="flex items-center gap-x-2">
      <span
        class="relative block text-slate-500 dark:text-slate-400 text-2xl -mb-1 pt-1.5 before:content-[''] before:absolute before:inset-0 before:m-auto before:h-[1px] before:w-full before:bg-slate-500 dark:before:bg-slate-400">
          ${course.price}
        </span>
      <span
        class="font-DanaDemiBold mt-2 text-3xl dark:text-white">
        رایگان!
      </span>
    </div>
    `
    : course.discount
    ? `
    <div class="flex items-center gap-x-2">
      <span
        class="relative block text-slate-500 dark:text-slate-400 text-2xl -mb-1 pt-1.5 before:content-[''] before:absolute before:inset-0 before:m-auto before:h-[1px] before:w-full before:bg-slate-500 dark:before:bg-slate-400">
          ${course.price}
        </span>
      <span
        class="flex items-center gap-x-1 font-DanaDemiBold mt-1 text-3xl dark:text-white">
        <span class="mt-2"> ${course.discountPrice} </span>
        <svg class="w-6 h-6">
          <use href="#toman"></use>
        </svg>
      </span>
    </div>
    `
    : `
    <div
      class="flex gap-x-1 items-center font-DanaDemiBold dark:text-white">
      <span class="text-3xl mt-1"> ${course.price} </span>
      <svg class="w-6 h-6">
        <use href="#toman"></use>
      </svg>
    </div>
    `;

  // Teacher

  courseTeacher.innerHTML =
    course.teacher == "SaeidiRad"
      ? "محمد امین سعیدی راد"
      : course.teacher == "barati"
      ? "مهرشاد براتی"
      : course.teacher == "ebadi"
      ? "حمیدرضا عبادی"
      : course.teacher == "rezaDolati"
      ? "رضا دولتی"
      : "غیره...";
  mobileCourseTeacher.innerHTML =
    course.teacher == "SaeidiRad"
      ? "محمد امین سعیدی راد"
      : course.teacher == "barati"
      ? "مهرشاد براتی"
      : course.teacher == "ebadi"
      ? "حمیدرضا عبادی"
      : course.teacher == "rezaDolati"
      ? "رضا دولتی"
      : "غیره...";

  // StudentsCount

  courseStudentsCount.innerHTML = course.studentsCount;
  mobileCourseStudentsCount.innerHTML = course.studentsCount;

  // Status

  courseStatus.innerHTML = course.status == "presell" ? "پیش فروش" : course.status == "completing" ? "در حال تکمیل" : "تکمیل شده";

  // Time

  courseTime.innerHTML = `${course.time} ساعت`;
};

window.addEventListener("load", async () => {
  await getCourse();
  fillBreadCrumb();
  setDatas();
  console.log(course);
});
