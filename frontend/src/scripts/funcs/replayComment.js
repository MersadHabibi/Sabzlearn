import { api, getToken , showNotif } from "./utils";

const createReplyComment = async (userId, commentId, commentText) => {
  if (!commentText) {
    showNotif("متن کامنت را وارد کنید!");
    return;
  }

  await api
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
    .then(res => showNotif("کامنت با موفقیت ثبت شد", "success"))
    .catch(err => showNotif("مشکلی در ثبت کامنت رخ داد! بعدا امتحان کنید"));
};

export default createReplyComment;
