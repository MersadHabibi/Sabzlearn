import "../styles/app.css";
import "./share.js";
import * as Converter from "persian-currency-converter";
import { api, fullScreenLoader, getToken, showNotif } from "./funcs/utils";

let course = null;

const buyBtn = document.querySelector("#course__buy-btn");

getCourse();

async function getCourse() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  try {
    fullScreenLoader("loading");
    const res = await api.get(`courses/${params.courseId}`);

    if (res.statusText !== "OK") throw new Error("Error");

    course = res.data;
    console.log(course);
    setDatas();
  } catch (err) {
    location.href = "./course.html";
  } finally {
    fullScreenLoader("loaded");
  }
}

function setDatas() {
  const imageElem = document.querySelector("#course__image");
  const titleElem = document.querySelector("#course__title");
  const mainPriceElem = document.querySelector("#course__main-price");
  const payablePriceElem = document.querySelector("#course__payable-price");

  imageElem.src = `http://localhost:3000/${course.image}`;

  titleElem.innerText = course.title;

  mainPriceElem.innerText = Converter.threeDigitSeparator(course.price);
  payablePriceElem.innerText = Converter.threeDigitSeparator(course.price);
}

buyBtn.addEventListener("click", async () => {
  try {
    fullScreenLoader("loading");
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
