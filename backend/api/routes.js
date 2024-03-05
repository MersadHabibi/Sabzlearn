import { Router } from "express";
import register, { verifyOtp } from "../Authentication/register.js";
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
import getEpisodeById from "../controller/getEpisodeById.js";
import { sendOtpController } from "../controller/sendOtp.js";
// import genToken from "../utils/genToken.js";
import passport from "passport";
import "../config/google.js";
import logout from "../Authentication/logout.js";
import googleAuth from "../Authentication/googleAuth.js";

const router = Router();

router.post("/register", register);
router.post("/send-otp", sendOtpController);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.get("/logout", AuthCheckMiddleWare, logout);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get("/google/callback", googleAuth);

router
  .route("/me")
  .get(AuthCheckMiddleWare, getMe)
  .patch(AuthCheckMiddleWare, updateUser);

router.get("/courses/:id", getCourseById);
router.get("/courses/category/:id", getCoursesByCategory);
router.get("/categories", getAllCategories);
router.route("/courses").get(getCourses).post(AuthCheckMiddleWare, buyCourse);

// router.get("/episodes/:id", getEpisodeById);
router
  .use(AuthCheckMiddleWare)
  .post("/comments", createComment)
  .post("/comments/:commentId/reply", createReply)
  .get("/episodes/:id", getEpisodeById);

export default router;
