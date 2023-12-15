import { api, showNotif } from "./funcs/utils.js";

const $ = document;

const emailAddressInput = $.querySelector("#form__email-address");
const passwordInput = $.querySelector("#form__password");

const form = $.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  login(emailAddressInput.value, passwordInput.value);
});

const login = (email, password) => {
  fetch(`${api}login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (!res.token) {
        showNotif("ایمیل یا رمز عبور درست نیست");
      } else if (res.token) {
        showNotif("با موفقیت وارد شدید", "success");
        location.href = "index.html";
      }
    });
};
