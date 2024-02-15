import { getAllCourses, getCourseById } from "../../../services/coursesAPIs";
import { addEpisodeApi, createTopicApi } from "../../../services/topicsAPIs";
import { _changeClasses, fullScreenLoader, showNotif } from "../../scripts/funcs/utils";

const overlay = document.querySelector(".overlay");
let course = null;
let topicIdForAddEpisode = "";

const preparationTopics = async (courseId = null) => {
  const seleteCoursesInput = document.querySelector("#select-course");

  const courses = await getAllCourses();

  seleteCoursesInput.innerHTML = `<option value=""> انتخاب دوره... </option>`;
  courses.forEach(course => {
    seleteCoursesInput.insertAdjacentHTML(
      "beforeend",
      `
      <option value="${course.id}"> ${course.title} </option>
    `
    );
  });

  seleteCoursesInput.addEventListener("change", () => {
    if (seleteCoursesInput.value) {
      getCourseAndShowDatas(seleteCoursesInput.value);
    } else {
      _changeClasses("remove", document.querySelector("#course-topic-cover"), ["hidden"]);
      _changeClasses("add", document.querySelector("#course-topic-container"), ["hidden"]);
    }
  });

  if (courseId) {
    getCourseAndShowDatas(courseId);
    seleteCoursesInput.value = courseId;
  }

  overlay.addEventListener("click", () => {
    closeModal(document.querySelector("#add-topic-modal"));
    closeModal(document.querySelector("#add-episode-modal"));
    closeModal(document.querySelector("#view-episodes-modal"));
  });

  window.previewEpisodeVideo = previewEpisodeVideo;
  window.addEpisodeHandler = addEpisodeHandler;
  window.viewEpisodesHandler = viewEpisodesHandler;
  window.addEpisodeModalSubmit = addEpisodeModalSubmit;
  window.addTopicModalSubmit = addTopicModalSubmit;
  window.addTopicHandler = addTopicHandler;
  window.closeModals = closeModals;
};

const getCourseAndShowDatas = async id => {
  document.querySelector("#topics__container").innerHTML = `<div class="loader mx-auto mt-5"></div>`;

  course = await getCourseById(id);

  if (course === null) {
    showNotif("دوره انتخاب شده پیدا نشد");
    document.querySelector("#select-course").value = "";

    return;
  }

  _changeClasses("add", document.querySelector("#course-topic-cover"), ["hidden"]);
  _changeClasses("remove", document.querySelector("#course-topic-container"), ["hidden"]);

  showTopics();
};

const showTopics = () => {
  const topicContainer = document.querySelector("#topics__container");
  topicContainer.innerHTML = "";

  if (course.subjects.length > 0) {
    course.subjects.forEach(topic => {
      topicContainer.insertAdjacentHTML(
        "beforeend",
        `
          <div
            class="topic flex flex-col lg:flex-row justify-between lg:items-center gap-y-3 gap-x-1 w-full bg-gray-100 border border-gray-300 dark:border-slate shadow-light dark:shadow-none dark:bg-gray dark:text-white px-5 py-4 rounded-lg">
            <!-- topic right -->
            <h4 class="font-DanaMedium text-lg md:text-xl"> ${topic.title} </h4>
  
            <!-- topic left -->
            <div class="flex flex-col xs:flex-row gap-2 shrink-0 self-end lg:self-auto w-full xs:w-auto">
              <button
                onclick="viewEpisodesHandler('${topic.id}')"
                class="view-episodes-btn bg-primary text-white w-full xs:w-auto flex justify-center items-center gap-x-1 px-4 py-2 rounded-md hover:bg-green-500 transition-colors">
                <svg class="w-6 h-6">
                  <use href="#eye"></use>
                </svg>
                <span class="text-sm"> دیدن قسمت ها </span>
              </button>
              <button
                onclick="addEpisodeHandler('${topic.id}')"
                class="add-episode-btn bg-secondary text-white w-full xs:w-auto flex justify-center items-center gap-x-1 px-4 py-2 rounded-md hover:bg-sky-600 transition-colors">
                <svg class="w-6 h-6">
                  <use href="#plus"></use>
                </svg>
                <span class="text-sm"> افزودن قسمت </span>
              </button>
            </div>
          </div>
      `
      );
    });
  } else {
    topicContainer.innerHTML = `<p class="dark:text-white text-xl text-center mb-2"> سر فصلی وجود ندارد </p>`;
  }
};

// Add Episode

const addEpisodeHandler = id => {
  openModal(document.querySelector("#add-episode-modal"));

  topicIdForAddEpisode = id;
};

const addEpisodeModalSubmit = event => {
  event.preventDefault();
  addEpisode(topicIdForAddEpisode);
};

const addEpisode = async topicId => {
  const titleInput = document.querySelector("#add-episode-modal #title");
  const isFreeInput = document.querySelector("#add-episode-modal #is-free");
  const fileInput = document.querySelector("#add-episode-modal #fileInput");

  if (!titleInput.value || !isFreeInput.value || fileInput.files.length == 0 || fileInput.files[0].type != "video/mp4") {
    showNotif(
      `${
        !titleInput.value
          ? "عنوان را وارد کنید"
          : fileInput.files.length == 0
          ? "ویدیو مورد نظر را انتخاب کنید"
          : fileInput.files[0]?.type != "video/mp4"
          ? "فایل ارسالی باید mp4 باشد"
          : !isFreeInput.value
          ? "مشخص کنید که دوره رایگان است یا خیر"
          : ""
      }`
    );
    return false;
  } else {

    let topic = course.subjects.filter(topic => {
      return topic.id == topicId;
    })[0];


    let newEpisode = {
      title: titleInput.value,
      subjectId: topicId,
      isFree: isFreeInput.value,
      sortId: topic.episodes.length + 1,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(newEpisode));
    formData.append("file", fileInput.files[0]);

    fullScreenLoader("loading");

    const res = await addEpisodeApi(formData);

    if (res.status === false) {
      fullScreenLoader("loaded");
      return;
    }

    closeModal(document.querySelector("#add-episode-modal"));
    getCourseAndShowDatas(course.id);

    titleInput.value = "";
    isFreeInput.value = "";
    fileInput.value = "";

    fullScreenLoader("loaded");
  }
};

// View Episodes

const viewEpisodesHandler = id => {
  openModal(document.querySelector("#view-episodes-modal"));

  let targetTopic = course.subjects.filter(topic => {
    return topic.id == id;
  })[0];

  showEpisodes(targetTopic);
};

const showEpisodes = topic => {
  const episodesContainer = document.querySelector("#episodes__container");
  episodesContainer.innerHTML = "";

  document.querySelector("#view-episodes-modal .title").innerHTML = topic.title;

  topic.episodes.forEach(episode => {
    episodesContainer.insertAdjacentHTML(
      "beforeend",
      `
    <div class="md:flex items-center gap-2.5 flex-wrap border border-gray-300 dark:border-slate space-y-3.5 md:space-y-0 bg-gray-100 dark:bg-gray-700 py-2 md:py-4 px-3.5 md:px-5 rounded-lg group">
      <a href="" class="flex items-center gap-x-1.5 md:gap-x-2.5 shrink-0 w-[85%]">
        <span
          class="flex items-center justify-center shrink-0 w-5 h-5 md:w-7 md:h-7 bg-white font-danaDemiBold text-xs md:text-base text-zinc-700 dark:text-white dark:bg-gray-800 group-hover:bg-primary group-hover:text-white rounded-md transition-colors mt-0.5"
          >1</span
        >
        <h4 class="text-zinc-700 dark:text-white group-hover:text-primary text-sm md:text-lg transition-colors pt-1">
          ${episode.title}
        </h4>
      </a>
      <div class="flex items-center w-full justify-between">
        <span
          class="inline-block h-[25px] leading-[25px] px-2.5 bg-gray-200 dark:bg-slate text-zinc-700 dark:text-white group-hover:bg-primary/10 group-hover:text-primary text-xs rounded transition-colors"
          > ${episode.isFree ? "جلسه رایگان" : "نقدی"} </span
        >
        <div class="flex items-center gap-x-1 md:gap-x-1.5">
          <span class="text-slate-500 dark:text-slate-400 text-sm md:text-lg mt-1"> ${episode.timeForShow} </span>
          <svg class="w-5 h-6 md:w-6 md:h-6 text-zinc-700 dark:text-white group-hover:text-primary transition-colors">
            <use xlink:href="#play-circle"></use>
          </svg>
        </div>
      </div>
    </div>
    `
    );
  });

  topic.episodes.length == 0 &&
    episodesContainer.insertAdjacentHTML(
      "beforeend",
      `
      <p class="text-center mt-2 text-xl dark:text-white"> قسمتی وجود ندارد </p>
    `
    );
};

// Add Topic

const addTopicHandler = () => {
  openModal(document.querySelector("#add-topic-modal"));
};

const addTopicModalSubmit = event => {
  event.preventDefault();
  createTopic();
};

const createTopic = async () => {
  const input = document.querySelector("#add-topic-modal input");
  fullScreenLoader("loading");

  if (input.value) {
    const res = await createTopicApi(
      course.id,
      {
        title: input.value,
        courseId: course.id,
        sortId: course.subjects.length + 1,
      },
      () => fullScreenLoader("loaded")
    );

    if (res.status === true) {
      input.value = "";
      getCourseAndShowDatas(course.id);
      closeModal(document.querySelector("#add-topic-modal"));
    }
  } else {
    showNotif("لطفا عنوان سر فصل را وارد کنید");
  }
};

// Close Modals

const closeModals = () => {
  closeModal(document.querySelector("#add-topic-modal"));
  closeModal(document.querySelector("#add-episode-modal"));
  closeModal(document.querySelector("#view-episodes-modal"));
};

// Preview Episode Video

const previewEpisodeVideo = elem => {
  const videoPreviewElem = document.querySelector("#video-preview");

  videoPreviewElem.src = URL.createObjectURL(elem.files[0]);
};

// Helpers

const openModal = modal => {
  _changeClasses("add", modal, ["show"]);
  _changeClasses("add", overlay, ["show"]);
};

const closeModal = modal => {
  _changeClasses("remove", modal, ["show"]);
  _changeClasses("remove", overlay, ["show"]);
};

export default preparationTopics;
