import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const BASE_URL = "http://localhost:8000";
const API_URL = "http://localhost:3000";

// Change Class

const _changeClasses = (action, element, className) => {
  if (element) {
    if (action == "add") {
      element.classList.add(...className);
    } else if (action == "remove") {
      element.classList.remove(...className);
    } else if (action == "toggle") {
      element.classList.toggle(...className);
    } else {
      console.log("somthing wrong");
    }
  }
};
 
// Timer

const createTimer = (
  dayElem,
  hourElem,
  minElem,
  secElem,
  time = "2:10:20:30",
  haveZero = false,
  callback,
) => {
  time = time.split(":");
  [
    dayElem.innerHTML,
    hourElem.innerHTML,
    minElem.innerHTML,
    secElem.innerHTML,
  ] = time;
  let interVal = setInterval(() => {
    time[3] = time[3] - 1;
    if (time[3] < 0) {
      time[3] = 60;
      time[2] = time[2] - 1;
      if (time[2] < 0) {
        time[2] = 59;
        time[1] = time[1] - 1;
        if (time[1] < 0) {
          time[1] = 23;
          time[0] = time[0] - 1;
          if (time[0] < 1) {
            clearInterval(interVal);
            callback();
            time[0] = 0;
            time[1] = 0;
            time[2] = 0;
            time[3] = 0;
          }
        }
      }
    }
    if (haveZero == true) {
      time[0] = time[0].toString().length == 1 ? `0${time[0]}` : time[0];
      time[1] = time[1].toString().length == 1 ? `0${time[1]}` : time[1];
      time[2] = time[2].toString().length == 1 ? `0${time[2]}` : time[2];
      time[3] = time[3].toString().length == 1 ? `0${time[3]}` : time[3];
    }

    [
      dayElem.innerHTML,
      hourElem.innerHTML,
      minElem.innerHTML,
      secElem.innerHTML,
    ] = time;
  }, 1000);
};

// Notif Function

const showNotif = (massage, status = "error") => {
  if (status == "error") {
    if (document.documentElement.classList.contains("dark")) {
      iziToast.show({
        backgroundColor: "#4A4B6D",
        title: "خطا",
        titleSize: "16px",
        message: massage,
        position: "topLeft",
        image: "/images/svgs/check-circle-dark.svg",
        rtl: true,
        close: false,
        progressBarColor: "#F43F5E",
        theme: "dark",
      });
    } else {
      iziToast.show({
        backgroundColor: "white",
        title: "خطا",
        titleSize: "16px",
        message: massage,
        position: "topLeft",
        image: "/images/svgs/check-circle.svg",
        rtl: true,
        close: false,
        progressBarColor: "#EC4899",
      });
    }
  } else if (status == "success") {
    if (document.documentElement.classList.contains("dark")) {
      iziToast.show({
        backgroundColor: "#4A4B6D",
        title: "موفق",
        titleSize: "16px",
        message: massage,
        position: "topLeft",
        image: "/images/svgs/check-circle-success-dark.svg",
        rtl: true,
        close: false,
        progressBarColor: "#22c55e",
        theme: "dark",
      });
    } else {
      iziToast.show({
        backgroundColor: "white",
        title: "موفق",
        titleSize: "16px",
        message: massage,
        position: "topLeft",
        image: "/images/svgs/check-circle-success.svg",
        rtl: true,
        close: false,
        progressBarColor: "#22c55e",
      });
    }
  }
};

// Get Token

const getToken = () => {
  return localStorage.getItem("token");
};

// Loader

const fullScreenLoader = (action) => {
  if (action == "loading") {
    _changeClasses("add", document.querySelector("#loader__container"), [
      "load",
    ]);
    _changeClasses("add", document.documentElement, ["overflow-hidden"]);
  } else if (action == "loaded") {
    _changeClasses("remove", document.querySelector("#loader__container"), [
      "load",
    ]);
    _changeClasses("remove", document.documentElement, ["overflow-hidden"]);
  }
};

// Create APIs - Axios

const api = axios.create({
  baseURL: `${API_URL}/api/`,
});
const apiAdmin = axios.create({
  baseURL: `${API_URL}/api/admin/`,
  headers: {
    Authorization: "Bearer " + getToken(),
  },
});

// Get Teacher Name

function getTeacherName(teacherName) {
  return teacherName == "SaeidiRad"
    ? "محمد امین سعیدی راد"
    : teacherName == "barati"
      ? "مهرشاد براتی"
      : teacherName == "ebadi"
        ? "حمیدرضا عبادی"
        : teacherName == "rezaDolati"
          ? "رضا دولتی"
          : teacherName == "moghadas"
            ? "اشکان مقدس"
            : "یافت نشد";
}

export {
  api,
  apiAdmin,
  _changeClasses,
  createTimer,
  showNotif,
  getToken,
  fullScreenLoader,
  getTeacherName,
  API_URL,
  BASE_URL,
};
