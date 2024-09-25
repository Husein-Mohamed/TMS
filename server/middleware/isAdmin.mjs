import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/config.mjs";

export const isAdmin = (request, response, next) => {
  const token = request.cookies.token;
  if (!token) {
    return response.status(403).json({ message: "Access denied, Admins only" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "Admin") {
      return response
        .status(403)
        .json({ message: "Access denied, Admins only" });
    }
    next();
  } catch (error) {
    return response.status(401).send({ message: "Invalid token" });
  }
};
