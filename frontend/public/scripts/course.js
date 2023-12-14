import { _changeClasses, createTimer } from "./funcs/utils.js";

const $ = document;

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

// Create Timer

createTimer(offerDay, offerHur, offerMin, offerSec, "0:14:10:3", false);
