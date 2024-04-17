import User from "../models/user.model.js";
import Playlist from "../models/playlist.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandle.js";
import asyncHandler from "../middleware/catchAsyncError.js";

export const register = asyncHandler(async (req, res, next) => {
  const { username, email, password, DOB, gender } = req.body;
  if (!email || !username || !DOB || !gender || !password) {
    return next(new ErrorHandler("All fields are required", 400));
  }
  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    return next(
      new ErrorHandler("User with username or email already exist", 409)
    );
  }
  const user = await User.create({
    email,
    username,
    password,
    DOB,
    gender,
  });
  await user.save();
  const likeVideosPlaylist = await Playlist.create({
    title: "Liked Videos",
    songs: [],
    userId: user._id,
  });
  await likeVideosPlaylist.save();
  res.json({
    success: true,
    message: "User registered Successfully",
    user,
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  let user = await User.findOne({ username });
  if (!user) {
    user = await User.findOne({ email: username });
  }
  if (!user) {
    return next(new ErrorHandler("Invalid Credentials", 400));
  } else {
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return next(new ErrorHandler("Invalid user credentials", 400));
    } else {
      const access_token = await user.generateAccessToken();
      const loggedInUser = await User.findById(user._id).select("-password");

      res
        .status(200)
        .cookie("access_token", access_token, { httpOnly: true })
        .json({
          success: true,
          message: "SignIn successfull",
          user: loggedInUser,
          access_token,
        });
    }
  }
});

export const logout = asyncHandler(async (req, res, next) => {
  return res
    .status(200)
    .clearCookie("access_token")
    .json({ message: "User logout successfull! " });
});
