import "../styles/app.css";
import { api, createTimer } from "./funcs/utils";

const otpInputs = document.querySelectorAll(".otp__input");

otpInputs.forEach(input => {
  input.addEventListener("input", () => {
    const nextInput = input.previousElementSibling;

    if (input.value.length === 1 && nextInput) nextInput.focus();
  });
});

// Timer

const secElem = document.querySelector(".timer__sec");
const minElem = document.querySelector(".timer__min");
const hurElem = document.querySelector(".timer__hur");
const dayElem = document.querySelector(".timer__day");
const submitBtn = document.querySelector(".submit-btn");
const resetTimerBtn = document.querySelector(".timer__reset");

createTimer(dayElem, hurElem, minElem, secElem, "0:0:1:0", true, () => {
  resetTimerBtn.removeAttribute("disabled");
  submitBtn.setAttribute("disabled", "true");
});

// Reset Timer

resetTimerBtn.addEventListener("click", () => {
  minElem.innerHTML = "01";
  secElem.innerHTML = "00";

  createTimer(dayElem, hurElem, minElem, secElem, "0:0:01:00", true);
  resetTimerBtn.setAttribute("disabled", "true");
  submitBtn.removeAttribute("disabled");
});

// Form Submit

const form = document.querySelector("form");
const codeInputs = document.querySelectorAll("otp__input");

form.addEventListener("submit", e => {
  e.preventDefault();

  // Get Params

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  // Get Code From Inputs

  const code = "";

  codeInputs.forEach(input => {
    code = code + input.value;
  });

  console.log(code);

  // Send API

  api
    .post("verify-otp", {
      email: params.email,
      code,
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
});
