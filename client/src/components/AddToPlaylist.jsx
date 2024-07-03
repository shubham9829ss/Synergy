import React from "react";
import { IoIosSearch } from "react-icons/io";

const AddToPlaylist = ({
  searchText,
  handleSearchChange,
  playlists,
  displayPlaylists,
  setFocused,
}) => {
  return (
    <div
      className="absolute top-1 right-[185px] z-10 w-[190px] "
      onMouseEnter={() => {
        setFocused(true);
      }}
      onMouseLeave={() => {
        setFocused(false);
      }}>
      <div className="shadow-md rounded-md p-1 m-0 bg-slate-700 text-white">
        <div className="flex bg-gray-600 items-center p-1 ">
          <IoIosSearch />
          <input
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            placeholder={"Search a playlist"}
            className="flex justify-between w-full text-left text-xs outline-none bg-gray-600 px-1 py-1 rounded-sm"
          />
        </div>
        <hr />
        {playlists.length > 0 && <div>{displayPlaylists()}</div>}
      </div>
    </div>
  );
};

export default AddToPlaylist;
