// Redirect Login & Register

import { getMe } from "../../../services/usersAPIs.js";

const redirectWhenHaveToken = async (redirectLink) => {
  const user = await getMe();
  if (user !== null) {
    location.replace(redirectLink);
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
