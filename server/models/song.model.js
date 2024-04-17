import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const songSchema = new mongoose.Schema(
  {
    songFile: {
      type: String,
      required: true,
    },
    songTitle: {
      type: String,
      required: true,
    },
    songThumbnail: {
      type: String,
    },
    songCategory: [
      {
        type: String,
      },
    ],
    songDuration: {
      type: Number,
    },
    songViews: {
      type: Number,
      default: 0,
    },
    songArtist: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

songSchema.plugin(mongooseAggregatePaginate);
const Song = mongoose.model("Song", songSchema);
export default Song;
