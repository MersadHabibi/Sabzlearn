import "../styles/app.css";
import "./header.js";
import "./share.js";
import { api, showNotif } from "./funcs/utils.js";
import { redirectWhenHaveToken, getAfterPageLink } from "./funcs/share.js";

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
    register(emailAddressInput.value, usernameInput.value, phoneNumberInput.value, passwordInput.value);
  }
});

const register = async (email, username, phoneNumber, password, address = " ") => {
  const newUser = {
    email,
    username,
    phoneNumber,
    password,
    repeat_password: password,
    address,
  };

  await fetch(`${api}register`, {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(res => res.json())
    .then(res => {
      if (res.details) {
        showNotif("ساخت حساب با مشکل مواجه شد");
      } else if (res.message) {
        showNotif("ایمیل یا نام کاربری قبلا استفاده شده است");
      } else {
        showNotif("اکانت شما با موفقیت ساخته شد", "success");
        localStorage.setItem("token", res.token);
        location.href = getAfterPageLink();
      }
    });
};
