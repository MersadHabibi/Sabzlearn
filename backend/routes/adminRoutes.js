import { Router } from "express";

import { createCourseUploader } from "../utils/createCourseUploadImage.js";
import createCourse from "../controller/Admin/createCourse.js";
import getCourses from "../controller/Admin/getCourses.js";
const router = Router();

// router.use('/api/admin',adminAuthMiddleWare)

// router.get("/courses", getCourses);
router
  .route("/courses")
  .post(createCourseUploader.single("image"), createCourse)
  .get(getCourses);

export default router;
