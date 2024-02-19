import { Router } from "express";
import register from "../Authentication/register.js";
import login from "../Authentication/login.js";
import AuthCheckMiddleWare from "../Authentication/Middleware/index.js";
import getMe from "../controller/getMe.js";
import getCourses, { getCourseById } from "../controller/getCourses.js";
import createComment from "../controller/Admin/createComment.js";
import createReply from "../controller/Admin/createReply.js";
import updateUser from "../controller/updateUser.js";
import getCoursesByCategory from "../controller/Admin/getCoursesByCategory.js";
import buyCourse from "../controller/buyCourse.js";
import getAllCategories from "../controller/Admin/getAllCategories.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.route("/me").get(AuthCheckMiddleWare, getMe).patch(updateUser);

router.get("/courses/:id", getCourseById);
router.get("/courses/category/:id", getCoursesByCategory);
router.get("/categories", getAllCategories);
router.route("/courses").get(getCourses).post(AuthCheckMiddleWare, buyCourse);

router
  .use(AuthCheckMiddleWare)
  .post("/comments", createComment)
  .post("/comments/:commentId/reply", createReply);

export default router;
