const $ = document;
const toggleThemeBtns = $.querySelectorAll(".toggle-theme");

toggleThemeBtns.forEach(toggleThemeBtn => {
  toggleThemeBtn.addEventListener("click", () => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  });
});
