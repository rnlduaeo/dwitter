import express from "express";
import { body, param, validationResult } from "express-validator";

import * as tweetController from "../controller/tweets.js";
import { isAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validator.js";

const router = express.Router();

//validation
//sanitization
// Contract Testing: Client-Server

const validateTweet = [
  body("text")
    .isLength({ min: 3 })
    .withMessage("text sholud be at least 3 characters"),
  validate,
];

router.get("/", isAuth, tweetController.getTweets);

router.get(
  "/:username",
  [
    param("username")
      .trim()
      .isAlphanumeric()
      .withMessage("username should be alphanumeric!"),
    validate,
  ],
  isAuth,
  tweetController.getUserTweet
);

router.post(
  "/",
  [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("username should not be empty!")
      .isAlphanumeric()
      .withMessage("username should be alphanumeric!"),
    body("name").trim().notEmpty(),
    validate,
  ],
  isAuth,
  tweetController.postTweet
);

router.delete(
  "/:id",
  [param("id").trim().notEmpty(), validate],
  isAuth,
  tweetController.deleteTweet
);

router.put(
  "/:id",
  [param("id").trim().notEmpty(), validate],
  isAuth,
  tweetController.putTweet
);

// router.get("/", (req, res) => {
//     req.
// })

export default router;
