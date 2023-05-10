import express from "express";

import { isAuth } from "../middleware/auth.js";
import * as authController from "../controller/auth.js";
import { body, param, validationResult } from "express-validator";
import { validate } from "../middleware/validator.js";

const validateAuth = [
  body("password")
    .isLength({ min: 3 })
    .withMessage("password sholud be at least 3 characters"),
  validate,
];

const router = express.Router();

router.post("/signup", validateAuth, authController.signup);
router.post("/login", validateAuth, authController.login);
router.get("/me", isAuth, authController.me);

export default router;
