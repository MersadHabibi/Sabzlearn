import { createNewCommentApi } from "../../../services/commentsAPIs";
import { showNotif } from "./utils";

const createNewComment = async (userId, courseId, commentText) => {
  if (!commentText) {
    showNotif("متن کامنت را وارد کنید!");
    return;
  }
  console.log("loader");

  const res = await createNewCommentApi(userId, courseId, commentText);

  return res.status;
};

export default createNewComment;
