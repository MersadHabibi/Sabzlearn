import "../styles/app.css";
import "./share.js";
import header from "./header.js";
import videojs from "video.js";
import "videojs-hotkeys";
import {
  getCourseById,
  getEpisodeByIdApi,
} from "../../services/coursesAPIs.js";
import {
  BASE_URL,
  _changeClasses,
  fullScreenLoader,
  getTeacherName,
} from "./funcs/utils.js";
import { getMe } from "../../services/usersAPIs.js";

header(document);

let user = null;
let course = null;
let episode = null;

// Video Player Options

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

let player = videojs(
  document.querySelector("#my_video_1"),
  options,
  function onPlayerReady() {
    videojs.log("Your player is ready!");
  },
);

// Get Params

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

window.addEventListener("load", async () => {
  fullScreenLoader("loading");

  course = await getCourseById(params.courseId);

  console.log(course);

  if (!course) {
    console.log("object");
    location.replace("./login.html");
  }

  user = await getMe(); // Get User

  course.subjects.forEach((subject) => {
    subject.episodes.forEach((epi) => {
      if (epi.id == params.episodeId) {
        episode = epi;
      }
    });
  });

  fullScreenLoader("loaded");

  // Show Title

  document.querySelector(".course__title").innerHTML = course.title;

  fillBreadCrumb();
  showSubjectsAndEpisodes();
  showInfos();

  loadVideo();

  questions(); // not complete
});

// Video

function loadVideo() {
  const videoElem = document.querySelector("video");
  const episodeNameElem = document.querySelector(".episode__name");

  episodeNameElem.innerHTML = episode.title;

  videoElem.innerHTML = `<source src=${BASE_URL}/${episode.link} type="video/mp4" />`;
  player.reset();

  player.src({
    type: "video/mp4",
    src: `${BASE_URL}/${episode.link}`,
  });
  player.playbackRates([0.5, 1, 1.25, 1.5, 1.75, 2]);
  player.load();

  player.poster(`${BASE_URL}/${course.image}`);
}

// Subjects

function showSubjectsAndEpisodes() {
  const subjectsWrapper = document.querySelector(".subjects__wrapper");

  course.subjects.forEach((subject) => {
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
        (episode) => `
        <div
          class="flex justify-between items-center px-5 h-14 text-slate-500 dark:text-slate-400 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors">
          <div class="relative pr-5 text-sm md:text-base">
            <a href="" class="line-clamp-1"> ${episode.title} </a>
            <span class="absolute right-0 top-0 bottom-0 m-auto w-2.5 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-sm"></span>
          </div>
          <span class="text-xs md:text-sm"> ${episode.timeForShow} </span>
        </div>
      `,
      )}
       
      </div>
    </div>
    `,
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
  const courseEpisodesNumberElem = document.querySelector(
    ".course__episodes-count",
  );
  const courseTeacherElem = document.querySelector(".course__techer");

  let episodesCount = 0;

  course.subjects.forEach((subject) => {
    episodesCount += subject.episodes.length;
  });

  courseStatusElem.innerHTML =
    course.status == "presell"
      ? "پیش فروش"
      : course.status == "completing"
        ? "در حال تکمیل"
        : "تکمیل شده";
  courseTimeElem.innerHTML = course.timeForShow;
  courseEpisodesNumberElem.innerHTML = episodesCount;
  courseTeacherElem.innerHTML = getTeacherName(course.teacher);
}

// questions

function questions() {
  const usernameElem = document.querySelector(".user__name");

  usernameElem.innerHTML = user?.username ? user?.username : "کاربر";
}
