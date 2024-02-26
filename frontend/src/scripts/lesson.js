import "../styles/app.css";
import "./share.js";
import header from "./header.js";
import videojs from "video.js";
import "videojs-hotkeys";
import { getCourseById } from "../../services/coursesAPIs.js";
import { _changeClasses, getTeacherName } from "./funcs/utils.js";
import { getMe } from "../../services/usersAPIs.js";

// header(document);

let course = null;
let user = null;

window.addEventListener("load", async () => {
  course = await getCourseById(localStorage.getItem("course"));
  user = await getMe();
  console.log(course, user);

  // Show Title

  document.querySelector(".course__title").innerHTML = course.title;

  fillBreadCrumb();
  showSubjectsAndEpisodes();
  showInfos();

  questions(); // not complete
});

function showSubjectsAndEpisodes() {
  const subjectsWrapper = document.querySelector(".subjects__wrapper");

  course.subjects.forEach(subject => {
    subjectsWrapper.insertAdjacentHTML(
      "beforeend",
      `
    <div class="subject">
      <!-- Head -->
      <div
        onclick="subjectClickHandler(this)"
        class="subject__head flex justify-between items-center px-5 h-14 bg-gray-200 dark:bg-gray-700 text-slate-500 dark:text-slate-400 cursor-pointer">
        <p class="text-base md:text-lg font-DanaMedium transition-colors line-clamp-1"> ${subject.title} </p>
        <svg class="size-5 transition-all">
          <use href="#chevron-down"></use>
        </svg>
      </div>
      <!-- Lessons -->
      <div class="episodes__wrapper h-0 overflow-hidden transition-all">
      ${subject.episodes.map(
        episode => `
        <div
          class="flex justify-between items-center px-5 h-14 text-slate-500 dark:text-slate-400 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors">
          <div class="relative pr-5 text-sm md:text-base">
            <a href="" class="line-clamp-1"> ${episode.title} </a>
            <span class="absolute right-0 top-0 bottom-0 m-auto w-2.5 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-sm"></span>
          </div>
          <span class="text-xs md:text-sm"> ${episode.timeForShow} </span>
        </div>
      `
      )}
       
      </div>
    </div>
    `
    );
  });

  window.subjectClickHandler = subjectClickHandler;
}

function subjectClickHandler(elem) {
  const subjectElem = elem.parentElement;

  console.log(subjectElem.className);

  if (subjectElem.className.includes("subject--active")) {
    _changeClasses("remove", subjectElem, ["subject--active"]);
  } else {
    _changeClasses("add", subjectElem, ["subject--active"]);
  }
}

// BreadCrumb

function fillBreadCrumb() {
  const breadCrumbCategory = document.querySelector("#breadCrumb__category");
  const breadCrumbName = document.querySelector("#breadCrumb__name");

  breadCrumbCategory.innerHTML = `<a href=./categories.html?category=${course.categoryId}> ${course.category.name} </a>`;

  breadCrumbName.innerHTML = course.title;
}

// Show Infos

function showInfos() {
  const courseStatusElem = document.querySelector(".course__status");
  const courseTimeElem = document.querySelector(".course__time");
  const courseEpisodesNumberElem = document.querySelector(".course__episodes-count");
  const courseTeacherElem = document.querySelector(".course__techer");

  let episodesCount = 0;

  course.subjects.forEach(subject => {
    episodesCount += subject.episodes.length;
  });

  courseStatusElem.innerHTML = course.status == "presell" ? "پیش فروش" : course.status == "completing" ? "در حال تکمیل" : "تکمیل شده";
  courseTimeElem.innerHTML = course.timeForShow;
  courseEpisodesNumberElem.innerHTML = episodesCount;
  courseTeacherElem.innerHTML = getTeacherName(course.teacher);
}

// Video Player

let options = {
  plugins: {
    hotkeys: {
      volumeStep: 0.1,
      seekStep: 5,
      enableModifiersForNumbers: false,
      // fullscreenKey: "F",
    },
  },
};

// questions

function questions() {
  const usernameElem = document.querySelector(".user__name");

  usernameElem.innerHTML = user?.username ? user?.username : "کاربر";
}

let player = videojs(document.querySelector("#my_video_1"), options, function onPlayerReady() {
  videojs.log("Your player is ready!");

  // In this context, `this` is the player that was created by Video.js.
  this.play();

  // How about an event listener?
  this.on("ended", function () {
    videojs.log("Awww...over so soon?!");
  });
});
