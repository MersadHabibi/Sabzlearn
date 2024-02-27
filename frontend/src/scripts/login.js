import "../styles/app.css";
import "./header.js";
import "./share.js";
import { fullScreenLoader } from "./funcs/utils.js";
import { redirectWhenHaveToken, getAfterPageLink } from "./funcs/share.js";
import { loginApi } from "../../services/usersAPIs.js";

redirectWhenHaveToken(getAfterPageLink());

const $ = document;

const emailAddressInput = $.querySelector("#form__email-address");
const passwordInput = $.querySelector("#form__password");

const form = $.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (emailAddressInput.value && passwordInput.value) login();
});

const login = async () => {
  fullScreenLoader("loading");
  const res = await loginApi({
    email: emailAddressInput.value,
    password: passwordInput.value,
  });

  if (res !== null) location.replace(getAfterPageLink());
};
