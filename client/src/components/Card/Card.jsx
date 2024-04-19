import "./Card.css";
import { useState, useEffect } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { playStart, playStop, playError } from "../../redux/controlSlice.js";
import { useGlobalContext } from "../../Context.jsx";

export default function Card({ song, idx }) {
  const dispatch = useDispatch();
  const { masterSong, isPlaying } = useSelector((state) => state.mainSong);
  const { resetEverything, setSongIdx } = useGlobalContext();

  const handlePlay = (song) => {
    console.log("handlePlay: ", song);
    setSongIdx(idx);
    if (isPlaying) {
      masterSong.mp3.currentTime = 0;
      masterSong.mp3.pause();
      resetEverything();
    }
    dispatch(playStart(song));
  };

  const handlePause = () => {
    dispatch(playStop());
  };

  return (
    song && (
      <div className="card bg-[#181818] col-span-1 p-4 rounded-lg h-60">
        <div className="relative">
          <img
            src={song?.songThumbnail}
            className="h-40 w-full rounded-lg"
            alt="not fetch"
          />
          {masterSong && masterSong._id === song._id && isPlaying ? (
            <button
              onClick={() => handlePause()}
              className="flex items-center play_btn absolute bottom-0 right-0 rounded-[50%] bg-green-500 justify-center p-3">
              <FaPause className="text-black text-xl" />
            </button>
          ) : (
            <button
              onClick={() => handlePlay(song)}
              className="flex items-center play_btn absolute bottom-0 right-0 rounded-[50%] bg-green-500 justify-center p-3">
              <FaPlay className="text-black text-xl" />
            </button>
          )}
        </div>
        <h3 className="text-sm font-semibold my-2">{song.songTitle}</h3>
        <p className="text-xs text-gray-400 leading-4 mb-8">
          {song.songArtist &&
            song.songArtist.map((artist, index) => (
              <span key={index}>{artist}</span>
            ))}
        </p>
      </div>
    )
  );
}
