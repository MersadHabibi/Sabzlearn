import { Router } from "express";

import { createCourseUploader } from "../utils/createCourseUploadImage.js";
import createCourse from "../controller/Admin/createCourse.js";
import createComment from "../controller/Admin/createComment.js";
const router = Router();

// router.use('/api/admin',adminAuthMiddleWare)

// router.get("/courses", getCourses);
router
  .route("/courses")
  .post(createCourseUploader.single("image"), createCourse);

router.route("/comments").post(createComment);

export default router;
