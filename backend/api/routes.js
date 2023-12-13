import { Router } from "express";
import register from "../Authentication/register.js";
import login from "../Authentication/login.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;
