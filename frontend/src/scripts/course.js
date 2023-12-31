import "../styles/app.css";
import "./share.js";
import header from "./header.js";
import { _changeClasses, api, createTimer, getMe } from "./funcs/utils.js";
import createNewComment from "./funcs/createComment.js";
import createReplyComment from "./funcs/replayComment.js";

const $ = document;
header($);
let course = null;
let user = null;
let replayOrNewComment = "new";

window.addEventListener("load", async () => {
  await getCourse();
  user = await getMe();
  fillBreadCrumb();
  setDatas();
  getAndShowComments();
  preparationNewAndReplayComment();
});

const preparationNewAndReplayComment = () => {
  const form = document.querySelector(".new-comment-form");
  const formTextarea = document.querySelector("#comment-textarea");

  form.addEventListener("submit", async e => {
    e.preventDefault();
    if (replayOrNewComment == "new") {
      await createNewComment(user.data.id, course.id, formTextarea.value);
    } else {
      await createReplyComment(user.data.id, replayOrNewComment, formTextarea.value);
    }
  });
};

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

// New Comment - close

cancelNewCommentBtn.addEventListener("click", () => {
  _changeClasses("remove", courseComments, ["show-new-comment-form"]);
});

// New Comment - open

const preparationNewCommentBtn = () => {
  openNewCommentBtn.addEventListener("click", async () => {
    _changeClasses("add", courseComments, ["show-new-comment-form"]);
    commentTo.innerText = `ثبت نظر جدید`;
    replayOrNewComment = "new";
  });
};

// Replay Comment - open

const preparationReplayCommentBtn = () => {
  const replayCommentBtn = $.querySelectorAll(".comment-reply-btn");

  replayCommentBtn.forEach(replayBtn => {
    replayBtn.addEventListener("click", elem => {
      let commentToName = replayBtn.dataset.creator;
      commentTo.innerText = `در پاسخ به ${commentToName}`;
      _changeClasses("add", courseComments, ["show-new-comment-form"]);

      replayOrNewComment = replayBtn.dataset.commentId;
    });
  });
};

// Create Timer

createTimer(offerDay, offerHur, offerMin, offerSec, "0:14:10:3", false);

// Get Course

const getCourse = async () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const courses = (await api.get("courses")).data;

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

// Get And Show Comments

const getAndShowComments = () => {
  const commentContainer = $.querySelector(".comments__container");

  course.comments.forEach(comment => {
    console.log(comment);
    commentContainer.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="p-3.5 md:p-5 bg-gray-100 dark:bg-gray-700 rounded-2xl">
        <!-- Comment Body -->
        <div class="flex gap-x-5 items-start">
          <!-- Comment Right User Picture & flag (desktop version) -->
          <div class="hidden md:flex flex-col gap-y-2 shrink-0">
            <img class="block w-10 h-10 md:w-15 md:h-15 object-cover rounded-full" src="/images/user-profile.png" />
            <div class="text-xs w-full rounded-md text-center py-0.5 ${
              comment.Users.role == "admin"
                ? "text-white dark:text-sky-500 bg-sky-500 dark:bg-sky-500/10"
                : comment.Users.role == "user"
                ? "bg-slate-500 text-white dark:bg-slate-400 dark:text-slate-400/10"
                : comment.Users.role == "student"
                ? "text-white dark:text-primary bg-primary dark:bg-primary/10"
                : ""
            }"> 
            ${comment.Users.role == "admin" ? "مدیریت" : comment.Users.role == "user" ? "کاربر" : comment.Users.role == "student" ? "دانشجو" : ""}
           </div>
          </div>
          <!-- Comment Left Reply comment, text, author, data, flag, reply btn -->
          <div class="w-full">
            <!-- Comment Head -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-x-2">
                <img class="block md:hidden w-10 h-10 object-cover rounded-full shrink-0" src="" />
                <div class="shrink-0">
                  <span class="text-zinc-700 dark:text-white font-danaMedium text-base md:text-xl"> ${comment.Users.username} </span>
                  <div class="flex items-center gap-x-1.5 mt-1">
                    <div
                      class="md:hidden text-xs w-full px-3 rounded-md text-center py-0.5 ${
                        comment.Users.role == "admin"
                          ? "text-white dark:text-sky-500 bg-sky-500 dark:bg-sky-500/10"
                          : comment.Users.role == "user"
                          ? "bg-slate-500 text-white dark:bg-slate-400 dark:text-slate-400/10"
                          : comment.Users.role == "student"
                          ? "text-white dark:text-primary bg-primary dark:bg-primary/10"
                          : ""
                      }">
                      ${comment.Users.role == "admin" ? "ادمین" : comment.Users.role == "user" ? "کاربر" : comment.Users.role == "student" ? "دانشجو" : ""}
                    </div>
                    <span class="font-danaLight text-slate-500 dark:text-white text-xs">${new Date(comment.createdAt).toLocaleDateString("fa-IR")}</span>
                  </div>
                </div>
              </div>
              <button class="comment-reply-btn w-6 h-5 text-slate-500 dark:text-gray-500" type="button" data-comment-id=${comment.id} data-creator="mersad">
                <svg class="w-6 h-5">
                  <use xlink:href="#reply"></use>
                </svg>
              </button>
            </div>
            <!-- Comment Text -->
            <div class="text-zinc-700 dark:text-white font-danaLight leading-7 mt-3.5">
              ${comment.body} <br />
              <br />
            </div>
            <!-- Comment Replies -->
            <div class="mt-7 space-y-3.5 md:space-y-5">
              <div id="" class="mt-7 p-3.5 md:p-5 bg-gray-200 dark:bg-slate rounded-2xl">
                <div class="flex gap-x-5 items-start">
                  <!-- Comment Right User Picture & flag (desktop version) -->
                  <div class="hidden md:flex flex-col shrink-0 gap-y-2">
                    <img class="block w-10 h-10 md:w-15 md:h-15 object-cover rounded-full" src="" />
                    <div class="text-xs w-full rounded-md text-white dark:text-sky-500 text-center py-0.5 bg-sky-500 dark:bg-sky-500/10">مدیریت</div>
                  </div>
                  <!-- Comment Left Text, author, data, flag -->
                  <div class="w-full">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-x-2">
                        <img class="block md:hidden w-10 h-10 object-cover rounded-full shrink-0" src="" />
                        <div class="shrink-0">
                          <span class="text-zinc-700 dark:text-white font-danaMedium text-base md:text-xl">قدیر یلمه</span>
                          <div class="flex items-center gap-x-1.5 mt-1">
                            <div
                              class="md:hidden text-xs w-full px-3 rounded-md text-white dark:text-sky-500 bg-sky-500 dark:bg-sky-500/10 text-center py-0.5 ">
                              مدیریت
                            </div>
                            <span class="font-danaLight text-slate-500 dark:text-white text-xs">1402/09/04</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Comment Text -->
                    <div class="text-zinc-700 dark:text-white font-danaLight leading-7 mt-3.5">بصورت آنلاین در قسمت مشاهده آنلاین جلسات هست</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
    );
  });

  preparationNewCommentBtn();
  preparationReplayCommentBtn();
};
