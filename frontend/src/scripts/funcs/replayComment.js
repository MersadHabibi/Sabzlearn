import { createNewReplyApi } from "../../../services/commentsAPIs";
import { api, getToken, showNotif } from "./utils";

const createReplyComment = async (userId, commentId, commentText) => {
  if (!commentText) {
    showNotif("متن کامنت را وارد کنید!");
    return;
  }

  const res = await createNewReplyApi(userId, commentId, commentText);

  return res.status;
};

export default createReplyComment;
