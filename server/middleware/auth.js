import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandle.js";

export const isAuthorized = async (req, res, next) => {
  try {
    const access_token = req.cookies?.access_token;
    if (!access_token)
      return res.json({ success: false, messase: "you are not authorized" });
    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded._id;
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid access token", 401));
  }
};

export const authorizeRole = async (req, res, next) => {
  const userId = req.userId;
  const user = await User.findById(userId);
  if (user.role !== "admin") {
    return next(new ErrorHandler("Unauthorized, only admin allowed", 403));
  }
  next();
};
