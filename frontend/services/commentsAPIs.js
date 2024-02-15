import { api, apiAdmin, getToken, showNotif } from "../src/scripts/funcs/utils";

async function deleteCommentApi(id) {
  return await apiAdmin
    .delete(`comments/${id}`)
    .then(res => {
      showNotif("کامنت با موفقیت پاک شد", "success");
      return true;
    })
    .catch(err => {
      showNotif("مشکلی در پاک کردن کامنت به وجود آمده ! بعدا دوباره امتحان کنید");
      return false;
    });
}

async function createNewCommentApi(userId, courseId, body) {
  return await api
    .post(
      "comments",
      {
        userId,
        courseId,
        body,
      },
      {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      }
    )
    .then(res => {
      showNotif("کامنت با موفقیت ثبت شد", "success");
      return {
        status: true,
      };
    })
    .catch(err => {
      showNotif("مشکلی در ثبت کامنت رخ داد! بعدا امتحان کنید");
      return {
        status: false,
      };
    });
}

async function createNewReplyApi(userId , commentId , body){
  
  return await api
    .post(
      `comments/${commentId}/reply`,
      {
        userId,
        body
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

      return {
        status: true
      }
    })
    .catch(err => {
      showNotif("مشکلی در ثبت کامنت رخ داد! بعدا امتحان کنید");

      return {
        status: false
      }
    });
}

export { deleteCommentApi , createNewCommentApi , createNewReplyApi };
