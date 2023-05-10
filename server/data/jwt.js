import jwt from "jsonwebtoken";
import { config } from "../config.js";

export function createJwt(username) {
  return jwt.sign(
    {
      username: username,
    },
    config.jwt.secretKey,
    { expiresIn: config.jwt.expiresInSec }
  );
}

export function isValidJwt(token) {
  return jwt.verify(token, config.jwt.secretKey, (err, decoded) => {
    if (err) {
      console.error(err);
      return;
    } else return decoded;
  });
}
