import jwt from "jsonwebtoken";
import { customResponse } from "../utils/customresponse.js"; // (added .js to avoid path issues)

const protect = (req, res, next) => {
  const header = req.headers.authorization; // lowercase

  if (!header || !header.startsWith("Bearer ")) {
    return customResponse(res, 401, "Unauthorized", null, false);
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (error) {
    return customResponse(res, 401, "Invalid or expired token", null, false);
  }
};

export default protect;
