import { _changeClasses, api, apiAdmin, getToken, showNotif } from "../../scripts/funcs/utils";

const overlay = document.querySelector(".overlay");
let course = null;
let topicIdForAddEpisode = "";

const preparationTopics = async () => {
  const seleteCoursesInput = document.querySelector("#select-course");

  await api.get("/courses").then(res => {
    seleteCoursesInput.innerHTML = `<option value=""> انتخاب دوره... </option>`;
    res.data.forEach(course => {
      seleteCoursesInput.insertAdjacentHTML(
        "beforeend",
        `
        <option value="${course.id}"> ${course.title} </option>
      `
      );
    });
  });

  seleteCoursesInput.addEventListener("change", () => {
    if (seleteCoursesInput.value) {
      getCourseAndShowDatas(seleteCoursesInput.value);
    } else {
      _changeClasses("remove", document.querySelector("#course-topic-cover"), ["hidden"]);
      _changeClasses("add", document.querySelector("#course-topic-container"), ["hidden"]);
    }
  });

  setRequiredEvents();
};

const getCourseAndShowDatas = id => {
  document.querySelector("#topics__container").innerHTML = "";
  api
    .get(`courses/${id}`)
    .then(res => {
      _changeClasses("add", document.querySelector("#course-topic-cover"), ["hidden"]);
      _changeClasses("remove", document.querySelector("#course-topic-container"), ["hidden"]);

      course = res.data;

      showTopics(res.data);
    })
    .catch(err => {
      showNotif("دوره انتخاب شده پیدا نشد");
      document.querySelector("#select-course").value = "";
    });
};

const createTopic = async () => {
  const input = document.querySelector("#add-topic-modal input");
  if (input.value) {
    apiAdmin
      .post(
        `courses/${course.id}/subjects`,
        {
          title: input.value,
          courseId: course.id,
          sortId: course.subjects.length + 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
          },
        }
      )
      .then(res => {
        input.value = "";
        showNotif("سر فصل جدید ساخته شد", "success");
        getCourseAndShowDatas(course.id);
        closeModal(document.querySelector("#add-topic-modal"));
      })
      .catch(err => {
        showNotif("ساخت سر فصل جدید با مشکل مواجه شد!");
      });
  } else {
    showNotif("لطفا عنوان سر فصل را وارد کنید");
  }
};

const showTopics = () => {
  const topicContainer = document.querySelector("#topics__container");

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
              data-topic-id=${topic.id}
              class="view-episodes-btn bg-primary text-white w-full xs:w-auto flex justify-center items-center gap-x-1 px-4 py-2 rounded-md hover:bg-green-500 transition-colors">
              <svg class="w-6 h-6">
                <use href="#eye"></use>
              </svg>
              <span class="text-sm"> دیدن قسمت ها </span>
            </button>
            <button
              data-topic-id=${topic.id}
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

  viewEpisodesHandler();
  addEpisodeHandler();
};

const addEpisodeHandler = () => {
  const addEpisodesBtns = document.querySelectorAll(".add-episode-btn");

  addEpisodesBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      openModal(document.querySelector("#add-episode-modal"));

      topicIdForAddEpisode = btn.dataset.topicId;
    });
  });
};

const addEpisode = topicId => {
  const titleInput = document.querySelector("#add-episode-modal #title");
  const isFreeInput = document.querySelector("#add-episode-modal #is-free");
  const fileInput = document.querySelector("#add-episode-modal #fileInput");

  if (!titleInput.value || !isFreeInput.value || fileInput.files.length == 0) {
    showNotif(
      `${
        !titleInput.value
          ? "عنوان را وارد کنید"
          : !isFreeInput.value
          ? "ویدیو مورد نظر را انتخاب کنید"
          : fileInput.files.length == 0
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

    apiAdmin
      .post("/episode", formData, {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      })
      .then(res => {
        showNotif("قسمت جدید با موفقیت ساخته شد", "success");
        closeModal(document.querySelector("#add-episode-modal"));
        getCourseAndShowDatas(course.id);

        titleInput.value = "";
        isFreeInput.value = "";
        fileInput.value = "";
      })
      .catch(err => {
        showNotif("مشکلی در ساخت قسمت جدید به وجود آمده!");
      });
  }
};

const viewEpisodesHandler = () => {
  const viewEpisodesBtns = document.querySelectorAll(".view-episodes-btn");

  viewEpisodesBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      openModal(document.querySelector("#view-episodes-modal"));
      let topicId = btn.dataset.topicId;

      let targetTopic = course.subjects.filter(topic => {
        return topic.id == topicId;
      })[0];

      showEpisodes(targetTopic);
    });
  });
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
          <span class="text-slate-500 dark:text-slate-400 text-sm md:text-lg mt-1"> 20:27 </span>
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

const setRequiredEvents = () => {
  const addTopicBtn = document.querySelector("#add-topic-btn");
  const closeModalsBtn = document.querySelectorAll(".close-modal");
  const addTopicModal = document.querySelector("#add-topic-modal");
  const addEpisodeModal = document.querySelector("#add-episode-modal");

  addEpisodeModal.addEventListener("submit", e => {
    e.preventDefault();
    addEpisode(topicIdForAddEpisode);
  });

  addTopicBtn.addEventListener("click", () => {
    openModal(addTopicModal);
  });
  addTopicModal.addEventListener("submit", e => {
    e.preventDefault();
    createTopic();
  });
  closeModalsBtn.forEach(btn => {
    btn.addEventListener("click", () => {
      closeModal(addTopicModal);
      closeModal(document.querySelector("#add-episode-modal"));
      closeModal(document.querySelector("#view-episodes-modal"));
    });
  });

  overlay.addEventListener("click", () => {
    closeModal(addTopicModal);
    closeModal(document.querySelector("#view-episodes-modal"));
  });
};

const openModal = modal => {
  _changeClasses("add", modal, ["show"]);
  _changeClasses("add", overlay, ["show"]);
};

const closeModal = modal => {
  _changeClasses("remove", modal, ["show"]);
  _changeClasses("remove", overlay, ["show"]);
};

export default preparationTopics;
