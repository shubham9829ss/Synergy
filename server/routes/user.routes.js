import express from "express";
import User from "../models/user.model.js";
const router = express.Router();
import { register, login, logout } from "../controllers/user.controller.js";
import { isAuthorized } from "../middleware/auth.js";

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthorized, logout);

export default router;
