import "../styles/app.css";

const otpInputs = document.querySelectorAll(".otp__input");

otpInputs.forEach(input => {
  input.addEventListener("input", () => {
    const nextInput = input.previousElementSibling;

    if (input.value.length === 1 && nextInput) nextInput.focus();
  });
});
