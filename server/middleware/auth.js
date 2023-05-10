import * as userRepository from "../data/auth.js";
import * as jwt from "../data/jwt.js";

const AUTH_ERROR = {
  message: "Authentication Error",
};

export const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json(AUTH_ERROR);
  }
  const token = authHeader.split(" ")[1];
  const decodedJwt = jwt.isValidJwt(token);
  debugger;
  if (!decodedJwt) {
    return res.status(401).json(AUTH_ERROR);
  } else if (!userRepository.foundByUsername(decodedJwt.id)) {
    return res.status(401).json(AUTH_ERROR);
  } else {
    req.username = decodedJwt.username;
    return next();
  }
};
