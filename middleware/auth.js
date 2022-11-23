import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";

const auth = (req, res, next) => {
  // console.log(req.headers);
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    console.log('NO TOKEN TO AUTHENTICATE');
    throw new UnAuthenticatedError(`Authentication Invalid`);
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (err) {
    console.log(`AUTH ERROR SENT`);
    throw new UnAuthenticatedError(`Authentication Invalid`);
  }
  // console.log(`AUTHENTICATION COMPLETED`);
  // next();
};

export default auth;
