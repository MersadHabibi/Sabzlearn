import "../styles/app.css";
import "./share.js";
import * as Converter from "persian-currency-converter";
import { BASE_URL, api, fullScreenLoader, getToken, showNotif } from "./funcs/utils";
import { getCourseById } from "../../services/coursesAPIs.js";

let course = null;

const buyBtn = document.querySelector("#course__buy-btn");

getCourse();

async function getCourse() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  fullScreenLoader("loading");
  course = await getCourseById(params.courseId);

  if (course === null) {
    location.href = "./course.html";
    return;
  }

  setDatas();

  fullScreenLoader("loaded");
}

function setDatas() {
  const imageElem = document.querySelector("#course__image");
  const titleElem = document.querySelector("#course__title");
  const mainPriceElem = document.querySelector("#course__main-price");
  const payablePriceElem = document.querySelector("#course__payable-price");

  imageElem.src = `${BASE_URL}/${course.image}`;

  titleElem.innerText = course.title;

  mainPriceElem.innerText = Converter.threeDigitSeparator(course.price);
  payablePriceElem.innerText = Converter.threeDigitSeparator(course.price);
}

buyBtn.addEventListener("click", async () => {
  fullScreenLoader("loading");
  try {
    const res = await api.post(
      "courses",
      {
        courseId: course.id,
      },
      {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      }
    );

    location.replace("./success_buy_course.html");
  } catch (err) {
    if (err.response.status === 401) showNotif("وارد شوید");
    else {
      showNotif("خرید دوره موفق نبود");
    }
  } finally {
    fullScreenLoader("loaded");
  }
});
