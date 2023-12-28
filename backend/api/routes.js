import { Router } from "express";
import register from "../Authentication/register.js";
import login from "../Authentication/login.js";
import AuthCheckMiddleWare from "../Authentication/Middleware/index.js";
import getMe from "../controller/getMe.js";
import getCourses, { getCourseById } from "../controller/getCourses.js";
import createComment from "../controller/Admin/createComment.js";
import createReply from "../controller/Admin/createReply.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", AuthCheckMiddleWare, getMe);

router
  .use(AuthCheckMiddleWare)
  .post("/comments", createComment)
  .post("/comments/:id/reply", createReply);
  
router.get("/courses", getCourses);
router.get("/courses/:id", getCourseById);

export default router;
