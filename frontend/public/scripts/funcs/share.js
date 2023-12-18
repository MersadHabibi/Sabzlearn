import { getToken, api, getMe } from "./utils.js";

// Redirect Login & Register

const redirectWhenHaveToken = async (redirectLink) => {
  const user = await getMe();
  console.log(user);
  if (user) {
    location.href = redirectLink;
  }
};

// Get After Query String

const getAfterPageLink = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  if (params.after) {
    return params.after;
  } else return "./index.html";
};

export { redirectWhenHaveToken, getAfterPageLink };
