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
import sendOtp from "../controller/sendOtp.js";
import Joi from "joi";

const router = Router();

router.post("/register", register);
router.post("/send-otp", (req, res) => {
  console.log("check user in register: ", req.sendOtpInRegister);
  const validationSchema = Joi.object({
    email: Joi.string().email().required().min(1),
    username: Joi.string().required().min(1),
  });
  validationSchema
    .validateAsync(req.body)
    .then((reqBody) => {
      sendOtp(reqBody.email, false, null, reqBody.username, null, null)
        .then((result) => {
          return res.json(result);
        })
        .catch((err) => {
          return res.status(403).json(err);
        });
    })
    .catch((err) => {
      return res.status(403).json({
        message: "Your Data Sended is Invalid",
        err: err.details[0].message,
      });
    });
});
router.post("/verify-otp", verifyOtp);
router.post("/login", login);

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
