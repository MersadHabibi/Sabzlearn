import { api, getToken, showNotif } from "./utils";

const createNewComment = async (userId, courseId, commentText) => {
  if (!commentText) {
    showNotif("متن کامنت را وارد کنید!");
    return;
  }

  await api
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
    })
    .catch(err => {
      showNotif("مشکلی در ثبت کامنت رخ داد! بعدا امتحان کنید");
    });
};

export default createNewComment;
