import { useEffect, useState } from "react";
import { BiSolidHome, BiLibrary } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { TbWorld } from "react-icons/tb";
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

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.account);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuthenticated) {
          const data = await getPlaylists(dispatch);
          if (data) {
            setPlaylists(data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch, isAuthenticated]);

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
          <button className="hover:bg-black/25 rounded-[50%] p-2">
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
        <div className="my-6 px-2">
          {playlists &&
            playlists.length > 0 &&
            playlists.map((p) => {
              return (
                <div key={p._id} className="flex gap-4 my-2">
                  <div>
                    <img
                      src="/assets/Arijit-1.jpg"
                      width={50}
                      height={50}
                      alt=""
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-medium mb-2">{p.title}</h3>
                    <p className="text-sm text-white/80">
                      Playlist
                      <span> . {p.songs.length} Songs</span>
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
