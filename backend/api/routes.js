import { Router } from "express";
import register from "../Authentication/register.js";
import login from "../Authentication/login.js";
import AuthCheckMiddleWare from "../Authentication/Middleware/index.js";
import getMe from "../controller/getMe.js";
import getCourses, { getCoursesById } from "../controller/getCourses.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", AuthCheckMiddleWare, getMe);
router.get("/courses", getCourses);
router.get("/courses/:id", getCoursesById);

export default router;
