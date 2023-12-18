import { getToken, api } from "./utils.js";

// Redirect Login & Register

const redirectWhenHaveToken = async (redirectLink) => {
  const res = await fetch(`${api}me`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${getToken()}`,
    },
  });
  if (res.status == 200) {
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
