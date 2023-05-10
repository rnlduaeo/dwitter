import express from "express";

import { isAuth } from "../middleware/auth.js";
import * as authController from "../controller/auth.js";

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.get("/me", isAuth, authController.isAuth);

export default router;
