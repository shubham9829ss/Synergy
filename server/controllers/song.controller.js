import ErrorHandler from "../utils/errorHandle.js";
import asyncHandler from "../middleware/catchAsyncError.js";
import Song from "../models/song.model.js";
import ApiFeatures from "../utils/apiFeatures.js";
import { uploadOnCloudinary, deleteOnCloudinary } from "../utils/cloudinary.js";
const localImageAddress =
  "https://d2n9ha3hrkss16.cloudfront.net/uploads/stage/stage_image/174055/optimized_product_thumb_stage.jpg";

const getAllSongs = asyncHandler(async (req, res) => {
  const resultPerPage = 4;
  const totalSongs = await Song.countDocuments();
  let query = req.query;
  let apiFeatures = new ApiFeatures(Song.find(), query).search();
  apiFeatures.pagination(resultPerPage);
  let songs = await apiFeatures.query;
  // console.log(songs);
  let filteredSongsCount = songs.length;
  let hasMore = totalSongs === filteredSongsCount ? false : true;
  res.status(200).json({
    success: true,
    songs,
    filteredSongsCount,
    totalSongs,
    hasMore,
    resultPerPage,
  });
});

const createSong = asyncHandler(async (req, res, next) => {
  const { songTitle, songArtist, songCategory } = req.body;
  const songLocalPath = req.files?.songFile[0]?.path;
  if (!songLocalPath) return next(new ErrorHandler("file error occur", 404));
  const songData = await uploadOnCloudinary(songLocalPath);
  if (!songData) return next(new ErrorHandler("songData is require", 404));
  let songThumbnailLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.songThumbnail) &&
    req.files.songThumbnail.length > 0
  ) {
    songThumbnailLocalPath = req.files.songThumbnail[0].path;
  }
  let songThumbnail;
  if (songThumbnailLocalPath) {
    songThumbnail = await uploadOnCloudinary(songThumbnailLocalPath);
  }

  const song = await Song.create({
    songFile: songData.url,
    songThumbnail: songThumbnail?.url || localImageAddress,
    songTitle,
    songArtist,
    songCategory,
    songDuration: parseInt(songData.duration),
  });
  await song.save();
  return res.status(201).json({ song, message: "song created successfully" });
});

const getSongById = asyncHandler(async (req, res, next) => {
  const { songId } = req.params;
  const song = await Song.findById(songId);
  if (!song) return next(new ErrorHandler("song not found by id", 404));
  return res.json({ success: true, song, message: "song send successfully" });
  //TODO: get Song by id
});

const updateSong = asyncHandler(async (req, res) => {
  const { songId } = req.params;

  //TODO: update Song details like title, description, thumbnail
});

const deleteSong = asyncHandler(async (req, res, next) => {
  const { songId } = req.params;
  const song = await Song.findById(songId);
  if (!song) return next(new ErrorHandler("song not found", 404));
  // await Song.findByIdAndDelete
  const public_id_song = song.songFile.split("/").pop().split(".")[0];
  const public_id_songThumbnail = song.songThumbnail
    .split("/")
    .pop()
    .split(".")[0];
  await deleteOnCloudinary(public_id_song, "video");
  await deleteOnCloudinary(public_id_songThumbnail, "image");
  const deletedResponse = await Song.findByIdAndDelete(songId);
  return res.json({
    success: true,
    message: "song delete successful",
    deletedResponse,
  });
  // delete from cloudinary
});

export { getAllSongs, createSong, getSongById, updateSong, deleteSong };
