import { api, getToken, showNotif } from "./utils";

const createReplyComment = async (userId, commentId, commentText) => {
  if (!commentText) {
    showNotif("متن کامنت را وارد کنید!");
    return;
  }

  return await api
    .post(
      `comments/${commentId}/reply`,
      {
        userId: userId,
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
    });
};

export default createReplyComment;
