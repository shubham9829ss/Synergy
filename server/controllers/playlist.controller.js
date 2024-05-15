import Playlist from "../models/playlist.model.js";
import ErrorHandler from "../utils/errorHandle.js";
import asyncHandler from "../middleware/catchAsyncError.js";
import Song from "../models/song.model.js";
export const likeSong = async (req, res) => {
  const { song_mp3, song_title, song_artist, song_thumbnail } = req.body;
  const playlist = await Playlist.findOne({
    userId: req.userId,
    title: "Liked Songs",
  });
  playlist.songs.push({ song_mp3, song_artist, song_title, song_thumbnail });
  playlist.save();
  res.json({ playlist, success: true, message: "song liked" });
};

export const getPlaylists = asyncHandler(async (req, res, next) => {
  const id = req.userId;
  const playlists = await Playlist.find({ userId: id });
  if (!playlists) return next(new ErrorHandler("playlist not found", 404));
  res.json({ success: true, message: playlists });
});

const createPlaylist = asyncHandler(async (req, res, next) => {
  // const { title, description = "" } = req.body;
  const userId = req.userId;
  const playlistCount = await Playlist.countDocuments({ userId });
  const title = `my playlist#${playlistCount}`;
  const description = "";
  const playlist = await Playlist.create({
    userId,
    title,
    description,
  });
  await playlist.save({ validateBeforeSave: false });
  return res.status(201).json({
    success: true,
    message: "playlist created successfully",
    playlist,
  });
});

const getUserPlaylists = asyncHandler(async (req, res, next) => {
  const userId = req.userId;
  const playlists = await Playlist.find({ userId });
  if (!playlists) {
    return next(new ErrorHandler("playlists not found", 404));
  }
  return res
    .status(200)
    .json({ success: true, playlists, message: "playlists send successfully" });
});

const getPlaylistById = asyncHandler(async (req, res, next) => {
  const { playlistId } = req.params;
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) return next(new ErrorHandler("playlists find error", 404));
  return res
    .status(200)
    .json({ success: true, message: "playlistById send", playlist });
});

const addSongToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, songId } = req.params;
  const playlist = await Playlist.findById(playlistId);
  const song = await Song.findById(songId);
  if (!playlist || !song)
    return next(
      new ErrorHandler(
        "song or playlist not found for add song in playlist",
        404
      )
    );
  const dateAdded = new Date();
  playlist.songs.push({ song, dateAdded });
  await playlist.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json({ success: true, message: "song added to playlist" }, song, playlist);
});

const removeSongFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, songId } = req.params;
  const song = await Song.findById(songId);
  if (!song)
    return next(new ErrorHandler("song not find while remove from playlist"));
  const playlist = await Playlist.findById(playlistId);
  if (!playlist)
    return next(
      new ErrorHandler("playlist not found while removing song from playlist")
    );
  const updatedSongs = playlist.songs.filter(
    (song) => song.toString() !== songId
  );
  playlist.songs = updatedSongs;
  await playlist.save();
  return res
    .status(200)
    .json({ message: "Song removed from playlist successfully", updatedSongs });
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const playlist = Playlist.findById(playlistId);
  if (!playlist)
    return next(new ErrorHandler("playlistId not found for deleting", 404));
  const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId);
  return res.status(200).json({
    success: true,
    message: "playlist delete successfully",
    deletedPlaylist,
  });
});

const updatePlaylist = asyncHandler(async (req, res, next) => {
  const { playlistId } = req.params;
  const { title, description } = req.body;
  const playlist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      $set: {
        title,
        description,
      },
    },
    { new: true }
  );
  if (!playlist) return next(new ErrorHandler("error in updatePlaylist", 404));
  return res
    .status(200)
    .json({ message: "update playlist successfully", playlist, success: true });
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addSongToPlaylist,
  removeSongFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
