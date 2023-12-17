import { Router } from "express";
import register from "../Authentication/register.js";
import login from "../Authentication/login.js";
import AuthCheckMiddleWare from "../Authentication/Middleware/index.js";
import getMe from "../controller/getMe.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", AuthCheckMiddleWare, getMe);

export default router;
