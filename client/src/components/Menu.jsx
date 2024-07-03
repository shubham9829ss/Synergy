import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdArrowDropright } from "react-icons/io";
import { RiDeleteBin7Line } from "react-icons/ri";
import { MdOutlinePersonSearch } from "react-icons/md";
import { useSelector } from "react-redux";
import AddToPlaylist from "../components/AddToPlaylist";

const Menu = ({ showMenu }) => {
  const [focused, setFocused] = useState(false);
  const { playlists } = useSelector((state) => state.playlists);
  const [searchText, setSearchText] = useState("");
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);

  const displayPlaylists = () => {
    if (searchText) {
      return filteredPlaylists.map((p, index) => (
        <div key={index}>{p.title}</div>
      ));
    } else {
      return playlists
        .slice(0, 3)
        .map((p, index) => <div key={index}>{p.title}</div>);
    }
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value.toLowerCase();
    setSearchText(searchTerm);
    const filtered = playlists.filter((p) =>
      p.title.toLowerCase().includes(searchTerm)
    );
    setFilteredPlaylists(filtered);
  };
  return (
    <div>
      {showMenu && (
        <div className="absolute top-full right-0 z-10 w-[190px] ">
          <div className="shadow-md rounded-md p-1 m-0 bg-slate-700 text-white">
            <button
              className="flex justify-between w-full text-left text-xs cursor-pointer hover:bg-gray-600 px-1 py-1 rounded-md"
              onMouseEnter={() => {
                setShowAddToPlaylist(true);
              }}
              onMouseLeave={() => setShowAddToPlaylist(false)}>
              <span className="flex">
                <span>
                  <AiOutlinePlus />
                </span>
                <span className="pl-2">Add to playlist</span>
              </span>
              <span className="">
                <IoMdArrowDropright className="text-lg mr-1" />
              </span>
            </button>
            <button className="flex gap-x-2 w-full text-left text-xs cursor-pointer hover:bg-gray-600 rounded-md px-1 py-1">
              <span>
                <RiDeleteBin7Line />
              </span>
              <span>Remove from this playlist</span>
            </button>
            <button className="flex gap-2 w-full text-left text-xs cursor-pointer hover:bg-gray-600 rounded-md px-1 py-1">
              <span>
                <MdOutlinePersonSearch />
              </span>
              <span>Go to Artist</span>
            </button>
          </div>
        </div>
      )}
      {(showAddToPlaylist || focused) && showMenu && (
        <AddToPlaylist
          searchText={searchText}
          handleSearchChange={handleSearchChange}
          playlists={playlists}
          displayPlaylists={displayPlaylists}
          setFocused={setFocused}
        />
      )}
    </div>
  );
};

export default Menu;
