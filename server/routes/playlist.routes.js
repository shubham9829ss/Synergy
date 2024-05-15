import express from "express";
import Playlist from "../models/playlist.model.js";
import { isAuthorized } from "../middleware/auth.js";
import {
  createPlaylist,
  getPlaylistById,
  getUserPlaylists,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
} from "../controllers/playlist.controller.js";

const router = express.Router();
router.use(isAuthorized);

router.route("/user").get(getUserPlaylists);

router.route("/").get(createPlaylist);

router
  .route("/:playlistId")
  .get(getPlaylistById)
  .patch(updatePlaylist)
  .delete(deletePlaylist);

router.route("/add/:songId/:playlistId").patch(addSongToPlaylist);
router.route("/remove/:songId/:playlistId").delete(removeSongFromPlaylist);

export default router;
