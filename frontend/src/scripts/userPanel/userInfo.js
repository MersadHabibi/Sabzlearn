import { changePasswordApi, changeUserProfileApi, editUserApi } from "../../../services/usersAPIs";
import { fullScreenLoader } from "../funcs/utils";

let isProfileChanged = false;
let isInfosChanged = false; // Name , Family , Number

const userInfo = user => {
  window.editUserInfo = editUserInfo;
  window.changeUserPassword = changeUserPassword;
  window.changeProfileHandler = changeProfileHandler;
  window.changeInputsValueHandler = changeInputsValueHandler;
};

const editUserInfo = async (event, id) => {
  event.preventDefault();

  fullScreenLoader("loading");

  // Change Profile
  
  if (isProfileChanged) {
    const userProfileInput = document.querySelector("#user__profile-input");

    const file = userProfileInput.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      const image = reader.result.split(",")[1];
      changeUserProfileApi(image, file.type, file.name);
    };
    reader.readAsDataURL(file);
  }

  // Change Infos => Name , Family , Number
  
  if (isInfosChanged) {
    const firstName = document.querySelector("#first_name");
    const lastName = document.querySelector("#last_name");

    const userNewInfos = {
      id,
      name: firstName.value,
      family: lastName.value,
    };

    const res = await editUserApi(userNewInfos);
  }

  fullScreenLoader("loaded");

  // res.status === true && location.reload;
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

function changeProfileHandler(elem, id) {
  console.log("change profile");
  const userProfileImage = document.querySelector(".user__profile-image");

  isProfileChanged = true;

  // Preview Image

  const [file] = elem.files;
  if (file) {
    userProfileImage.src = URL.createObjectURL(file);
  }
}

function changeInputsValueHandler() {
  isInfosChanged = true;
}

export default userInfo;
