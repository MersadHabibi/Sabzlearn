import "../styles/app.css";
import "./header.js";
import "./share.js";
import { api, showNotif } from "./funcs/utils.js";
import { redirectWhenHaveToken, getAfterPageLink } from "./funcs/share.js";

redirectWhenHaveToken(getAfterPageLink());

const $ = document;

const emailAddressInput = $.querySelector("#form__email-address");
const passwordInput = $.querySelector("#form__password");

const form = $.querySelector("form");

form.addEventListener("submit", e => {
  e.preventDefault();
  login(emailAddressInput.value, passwordInput.value);
});

const login = async (email, password) => {
  console.log(email, password);
  await api
    .post(
      "login",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then(res => {
      console.log(res);
      if (!res.data.token) {
        showNotif("ایمیل یا رمز عبور درست نیست");
      } else if (res.data.token) {
        showNotif("با موفقیت وارد شدید", "success");
        localStorage.setItem("token", res.data.token);
        location.href = getAfterPageLink();
      }
    })
    .catch(err => showNotif("مشکلی پیش آمده"));
};
