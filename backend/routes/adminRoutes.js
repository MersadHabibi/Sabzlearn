import { Router } from "express";

import { createCourseUploader } from "../utils/createCourseUploadImage.js";
import createCourse from "../controller/Admin/createCourse.js";
import createComment from "../controller/Admin/createComment.js";
import EditCourse from "../controller/Admin/EditCourse.js";
import deleteCourse from "../controller/Admin/deleteCourse.js";
import deleteComment from "../controller/Admin/deleteComment.js";
import updateCommentStatus from "../controller/Admin/updateCommentStatus.js";
import createSubject from "../controller/Admin/createSubject.js";
import { createEpisodeUploader } from "../utils/createEpisodeUploadFile.js";
import createEpisode from "../controller/Admin/createEpisode.js";
import getAllUsers from "../controller/Admin/getAllUsers.js";
import deleteUser from "../controller/Admin/deleteUser.js";
import changeUserRole from "../controller/Admin/changeUserRole.js";
import blockUser from "../controller/Admin/blockUser.js";
import createCategory from "../controller/Admin/createCategory.js";
import getAllCategories from "../controller/Admin/getAllCategories.js";
const router = Router();

// router.use('/api/admin',adminAuthMiddleWare)

// router.get("/courses", getCourses);

router
  .route("/courses")
  .post(createCourseUploader.single("image"), createCourse);

router.route("/courses/:id").patch(EditCourse).delete(deleteCourse);

router.route("/courses/:courseId/subjects").post(createSubject);

router
  .route("/comments/:commentId")
  .delete(deleteComment)
  .patch(updateCommentStatus);

router
  .route("/episode")
  .post(createEpisodeUploader.single("file"), createEpisode);

router.route("/users").get(getAllUsers);

router
  .route("/users/:id")
  .delete(deleteUser)
  .patch(changeUserRole)
  .post(blockUser); //admin

router.route("/categories").post(createCategory);

export default router;
