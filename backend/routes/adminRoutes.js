import { Router } from "express";

import { createCourseUploader } from "../utils/createCourseUploadImage.js";
import createCourse from "../controller/Admin/createCourse.js";
import createComment from "../controller/Admin/createComment.js";
import EditCourse from "../controller/Admin/EditCourse.js";
import deleteCourse from "../controller/Admin/deleteCourse.js";
import deleteComment from "../controller/Admin/deleteComment.js";
const router = Router();

// router.use('/api/admin',adminAuthMiddleWare)

// router.get("/courses", getCourses);
router
  .route("/courses")
  .post(createCourseUploader.single("image"), createCourse);



router.route("/courses/:id").patch(EditCourse).delete(deleteCourse);

router.route("/comments/:id").delete(deleteComment);

export default router;
