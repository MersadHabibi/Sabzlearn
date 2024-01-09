import { api, fullScreenLoader, getToken, showNotif } from "./utils";

const createNewComment = async (userId, courseId, commentText) => {
  if (!commentText) {
    showNotif("متن کامنت را وارد کنید!");
    return;
  }
  console.log("loader");
  fullScreenLoader("loading");
  return await api
    .post(
      "comments",
      {
        userId: userId,
        courseId: courseId,
        body: commentText,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken(),
        },
      }
    )
    .then(res => {
      showNotif("کامنت با موفقیت ثبت شد", "success");
      return true;
    })
    .catch(err => {
      showNotif("مشکلی در ثبت کامنت رخ داد! بعدا امتحان کنید");
      return false;
    })
    .finally(() => {
      fullScreenLoader("loaded");
    });
};

export default createNewComment;
