const $ = document;

const form = $.querySelector("form");
const usernameInput = $.querySelector("#form__username");
const phoneNumberInput = $.querySelector("#form__phone-number");
const emailAddressInput = $.querySelector("#form__email-address");
const passwordInput = $.querySelector("#form__password");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!usernameInput.value || !phoneNumberInput.value || !emailAddressInput.value || !passwordInput) {
    showNotif(
      ` لطفا ${!usernameInput.value ? "نام کاربری ," : ""} ${!phoneNumberInput.value ? "شماره موبایل ," : ""} ${
        !emailAddressInput.value ? "ایمیل ," : ""
      } ${!passwordInput.value ? "رمز عبور " : ""} را به درستی وارد کنید.`
    );
  }
});

// Notif Function

const showNotif = (massage) => {
  if (document.documentElement.classList.contains("dark")) {
    iziToast.show({
      backgroundColor: "#4A4B6D",
      title: "خطا",
      titleSize: "16px",
      message: massage,
      position: "topLeft",
      image: "./images/svgs/check-circle-dark.svg",
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
      image: "./images/svgs/check-circle.svg",
      rtl: true,
      close: false,
      progressBarColor: "#EC4899",
    });
  }
};
