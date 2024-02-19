import "../styles/app.css";
import "./header.js";
import "./share.js";
import { api, fullScreenLoader, showNotif } from "./funcs/utils.js";
import { redirectWhenHaveToken, getAfterPageLink } from "./funcs/share.js";
import { registerApi } from "../../services/usersAPIs.js";

redirectWhenHaveToken(getAfterPageLink());

const $ = document;

const form = $.querySelector("form");
const usernameInput = $.querySelector("#form__username");
const phoneNumberInput = $.querySelector("#form__phone-number");
const emailAddressInput = $.querySelector("#form__email-address");
const passwordInput = $.querySelector("#form__password");

form.addEventListener("submit", e => {
  e.preventDefault();
  if (!usernameInput.value || !phoneNumberInput.value || !emailAddressInput.value || !passwordInput) {
    showNotif(
      ` لطفا ${!usernameInput.value ? "نام کاربری ," : ""} ${!phoneNumberInput.value ? "شماره موبایل ," : ""} ${!emailAddressInput.value ? "ایمیل ," : ""} ${
        !passwordInput.value ? "رمز عبور " : ""
      } را به درستی وارد کنید.`
    );
  } else {
    register();
  }
});

const register = async () => {
  const newUser = {
    email: emailAddressInput.value,
    username: usernameInput.value,
    phoneNumber: phoneNumberInput.value,
    password: passwordInput.value,
    repeat_password: passwordInput.value,
    address: " ",
  };

  console.log(newUser);
  fullScreenLoader("loading");
  const res = await registerApi(newUser);
  fullScreenLoader("loaded");
  if (res !== null) location.replace(getAfterPageLink());
};
