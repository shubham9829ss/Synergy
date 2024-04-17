import ErrorHandler from "../utils/errorHandle.js";
import asyncHandler from "../middleware/catchAsyncError.js";
import Song from "../models/song.model.js";
import ApiFeatures from "../utils/apiFeatures.js";
import { uploadOnCloudinary, deleteOnCloudinary } from "../utils/cloudinary.js";
const localImageAddress =
  "https://d2n9ha3hrkss16.cloudfront.net/uploads/stage/stage_image/174055/optimized_product_thumb_stage.jpg";

const getAllSongs = asyncHandler(async (req, res) => {
  const apiFeatures = new ApiFeatures(Song.find(), req.query).search();
  let songs = await apiFeatures.query;
  console.log(songs);
  // Prepare query parameters for filtering
  // const filters = {};
  // if (query) {
  //   filters.title = { $regex: query, $options: "i" }; // Example: Searching by title
  // }

  // // Prepare sorting parameters
  // const sortOptions = {};
  // if (sortBy) {
  //   sortOptions[sortBy] = sortType === "desc" ? -1 : 1; // Example: Sorting by a field
  // }

  // // Pagination options
  // const options = {
  //   limit: parseInt(limit),
  //   sort: sortOptions,
  // };

  // // If lastSongId is provided, use it for filtering
  // if (lastSongId) {
  //   filters._id = { $gt: lastSongId }; // Find songs with IDs greater than lastSongId
  // }

  // // Fetch songs based on the filters, sorting, and pagination
  // // const songs = await Song.find(filters, null, options);
  // let songs;
  // if (query === "") {
  //   // If query is null, return all songs without filtering
  //   songs = await Song.find({}, null, options);
  //   console.log(songs);
  // } else {
  //   // Otherwise, apply the filters
  //   songs = await Song.find(filters, null, options);
  // }

  res
    .status(200)
    .json({ success: true, data: songs, hasMore: songs.length === 4 });
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
  console.log(songData);
  const song = await Song.create({
    songFile: songData.url,
    songThumbnail: songThumbnail?.url || localImageAddress,
    songTitle,
    songArtist,
    songCategory,
    songDuration: songData.duration.toFixed(0),
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
