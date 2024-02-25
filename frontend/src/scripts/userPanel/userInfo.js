import { changePasswordApi, editUserApi } from "../../../services/usersAPIs";
import { fullScreenLoader } from "../funcs/utils";

const userInfo = user => {
  window.editUserInfo = editUserInfo;
  window.changeUserPassword = changeUserPassword;
};

const editUserInfo = async (event, id) => {
  event.preventDefault();

  const firstName = document.querySelector("#first_name");
  const lastName = document.querySelector("#last_name");

  const userNewInfos = {
    id,
    name: firstName.value,
    family: lastName.value,
  };

  fullScreenLoader("loading");
  const res = await editUserApi(userNewInfos, () => {
    fullScreenLoader("loaded");
  });

  res.status === true && location.reload;
};

const changeUserPassword = async (event, id) => {
  event.preventDefault();

  const currentPasswordInput = document.querySelector("#current-password");
  const newPasswordInput = document.querySelector("#new-password");

  const newUserPassword = {
    id,
    current_password: currentPasswordInput.value,
    new_password: newPasswordInput.value,
  };

  fullScreenLoader("loading");
  const res = await changePasswordApi(newUserPassword, () => {
    fullScreenLoader("loaded");
  });

  if (res.status === true) {
    currentPasswordInput.value = "";
    newPasswordInput.value = "";
  }
};

export default userInfo;
