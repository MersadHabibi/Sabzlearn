import { getMe } from "../../scripts/funcs/utils";

export default async function routeProtect() {
  const user = (await getMe()).data;
  if (user == undefined) {
    location.href = "../login.html";
  } else if (user.role != "admin") {
    location.href = "../index.html";
  }
  console.log(user);
}
