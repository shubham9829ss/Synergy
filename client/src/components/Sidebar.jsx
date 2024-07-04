import { useEffect, useState, useRef } from "react";
import { BiSolidHome, BiLibrary } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { WiDayRainWind } from "react-icons/wi";
import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  myPlaylistSuccess,
  myPlaylistFail,
  myPlaylistRequest,
} from "../redux/playlistSlice.js";

const getPlaylists = async (dispatch) => {
  try {
    dispatch(myPlaylistRequest());
    const res = await fetch("/api/playlist/user");
    const data = await res.json();
    if (data.success === false) {
      dispatch(myPlaylistFail(data.message));
      return null;
    }
    dispatch(myPlaylistSuccess(data.playlists));
    return data.playlists;
  } catch (error) {
    dispatch(myPlaylistFail(error));
    return null;
  }
};

const Sidebar = ({ updatePlaylist, setData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.account);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [playlistCreate, setPlaylistCreate] = useState(false);
  const [playlistId, setPlaylistId] = useState(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleRightClick = (event, playlistId) => {
    event.preventDefault();
    setShowDropDown(true);
    setPlaylistId(playlistId);
    const x = 200;
    const y = event.clientY + window.scrollY;
    setX(x);
    setY(y);
  };
  const handleUpdatePlaylist = () => {
    const data = playlists.find((item) => item._id === playlistId);
    const formData = {
      title: data.title,
      description: data.description,
      playlistId: data._id,
    };
    setData(formData);
    updatePlaylist();
  };
  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/playlist/${playlistId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedPlaylists = playlists.filter((p) => p._id !== playlistId);
      setPlaylists(updatedPlaylists);
      setPlaylistId(null);
      setShowDropDown(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (isAuthenticated) {
          const data = await getPlaylists(dispatch);
          if (data) {
            setPlaylists(data);
          }
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
    setPlaylistCreate(false);
  }, [dispatch, isAuthenticated, playlistCreate]);

  const createPlaylist = async () => {
    try {
      setPlaylistCreate(true);
      const res = await fetch("/api/playlist/");
      const data = await res.json();
      if (data.success === false) {
        throw new Error("playlsit not create");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlaylistItem = (playlistId) => {
    navigate(`/playlist/${playlistId}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const playlistDiv = document.getElementById("playlist");
      if (playlistDiv && !playlistDiv.contains(event.target)) {
        setShowDropDown(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [showDropDown]);
  return (
    <div className="left-0 mt-2 top-0 sidebar sm:w-1/4">
      <div className="nav tertiary_bg rounded-lg p-6">
        <Link to={"/"} className="flex items-center gap-6">
          <BiSolidHome className="font-bold text-2xl" />
          <span className="text-lg">Home</span>
        </Link>
        <Link to={"/search"} className="flex mt-4 items-center gap-6">
          <FiSearch className="font-bold text-2xl" />
          <span className="text-lg">Search</span>
        </Link>
      </div>
      <div className="mt-2 tertiary_bg rounded-lg px-2 py-2">
        <div className="flex px-4 justify-between mb-4 items-center gap-4">
          <div className="flex gap-2 items-center">
            <BiLibrary className="font-bold text-xl" />
            <span>Your library</span>
          </div>
          <button
            onClick={createPlaylist}
            className="hover:bg-black/25 rounded-[50%] p-2 hover:cursor-pointer"
            disabled={loading}>
            <FaPlus className="font-bold text-xl" />
          </button>
        </div>
        <div className="btns flex gap-4 mb-4">
          <Link
            to={"/"}
            className="rounded-full mt-4 px-3   py-1 bg-white/10 text-white text-sm">
            Playlists
          </Link>
          <Link
            to={"/"}
            className="rounded-full mt-4 px-3   py-1 bg-white/10 text-white text-sm">
            Artists
          </Link>
        </div>
        <div className="my-6 px-2" id="playlist">
          {playlists &&
            playlists.length > 0 &&
            playlists.map((p) => {
              return (
                <div
                  key={p._id}
                  id={p._id}
                  onContextMenu={(event) => handleRightClick(event, p._id)}
                  onClick={() => handlePlaylistItem(p._id)}
                  className="flex gap-4 my-2">
                  <div id="image">
                    <img
                      src="/assets/Arijit-1.jpg"
                      width={50}
                      height={50}
                      alt=""
                    />
                  </div>
                  <div id="details">
                    <h3 className="text-base font-medium mb-2">{p.title}</h3>
                    <p className="text-sm text-white/80">
                      {p.songs.length} Songs
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
        {showDropDown && (
          <div
            className={`absolute dropdown bg-gray-800 text-xs border-2 w-7rem h-2rem p-1`}
            style={{ top: `${y}px`, left: `${x}px` }}>
            <ul className="">
              <li className="">
                <button
                  className="p-2 w-full text-left border-white/10  hover:bg-white/10"
                  onClick={handleUpdatePlaylist}>
                  <span>Edit Details</span>
                </button>
              </li>
              <li className="">
                <button
                  className="p-2 w-full text-left border-white/10  hover:bg-white/10"
                  onClick={handleDelete}>
                  <span>Delete Playlist</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="fixed left-0 bottom-16 custom-blur">
        <div className="flex justify-center space-x-3 p-2 m-2 text-3xl ">
          <span>😀</span>
          <span>😪</span>
          <span>😡</span>
          <span>
            <WiDayRainWind />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
