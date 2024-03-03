import "../../styles/app.css";

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

window.addEventListener("load", () => {
  const token = params.token;

  if (!token) {
    location.replace("./error.html");
    return;
  }

  localStorage.setItem("token", token);
});
