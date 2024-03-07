import { forgetPasswordApi } from "../../services/usersAPIs";
import "../styles/app.css";
import { fullScreenLoader, showNotif } from "./funcs/utils";

const form = document.querySelector("form");

const emailInput = document.querySelector("#form__email-address");

const submitBtn = document.querySelector(".submit-btn");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!emailInput.value) {
    showNotif("آدرس ایمیل را وارد کنید", "error");

    return;
  }

  fullScreenLoader("loading");
  const res = await forgetPasswordApi(emailInput.value);
  fullScreenLoader("loaded");

  if (res.status) {
    submitBtn.setAttribute("disabled", "true");
    submitBtn.innerHTML = "ارسال شد";
    emailInput.value = "";

    emailInput.addEventListener("input", () => {
      submitBtn.removeAttribute("disabled");
      submitBtn.innerHTML = "بازنشانی";
    });
  }
});
