import { editUserApi } from "../../../services/usersAPIs";
import { fullScreenLoader } from "../funcs/utils";

const userInfo = user => {
  window.editUserInfo = editUserInfo;
};

const editUserInfo = async (event, id) => {
  event.preventDefault();

  const firstName = document.querySelector("#first_name");
  const lastName = document.querySelector("#last_name");

  const newUserInfos = {
    id,
    name: firstName.value,
    family: lastName.value,
  };

  fullScreenLoader("loading");
  const res = await editUserApi(newUserInfos, () => {
    fullScreenLoader("loaded");
  });

  res.status === true && location.reload;
};

export default userInfo;
