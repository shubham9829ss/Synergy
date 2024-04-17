import { Router } from "express";
import {
  getAllSongs,
  deleteSong,
  createSong,
  getSongById,
} from "../controllers/song.controller.js";
import { isAuthorized, authorizeRole } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";

const router = Router();

router.route("/").get(getAllSongs);

router.route("/create").post(
  // isAuthorized,
  // authorizeRole,
  upload.fields([
    { name: "songFile", maxCount: 1 },
    { name: "songThumbnail", maxCount: 1 },
  ]),
  createSong
);
// { name: "thumbnail", maxCount: 1 },

router
  .route("/:songId")
  .get(getSongById)
  .delete(isAuthorized, authorizeRole, deleteSong);

export default router;
