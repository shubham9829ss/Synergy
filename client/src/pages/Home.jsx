import Layout from "../Layout";
import "./Home.css";
import { FaAngleLeft, FaAngleRight, FaSearch, FaUser } from "react-icons/fa";
import Card from "../components/Card";
import SongBar from "../components/SongBar";
import { Link } from "react-router-dom";
import Loader from "../components/Loading";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { songsRequest, songsSuccess, songsFail } from "../redux/songSlice";
import InfiniteScroll from "react-infinite-scroll-component";
const fetchMoreSongs = async (dispatch, currentPage, keyword = "") => {
  try {
    dispatch(songsRequest());
    let url = `/api/songs?currentPage=${currentPage}&keyword=${keyword}`;
    const res = await fetch(url);
    const data = await res.json();
    dispatch(songsSuccess(data));
  } catch (error) {
    dispatch(songsFail(error.message));
  }
};

const Home = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const {
    songs,
    loading,
    hasMore,
    resultPerPage,
    keyword,
    filteredSongsCount,
    totalSongs,
  } = useSelector((state) => state.songs);

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  useEffect(() => {
    const fetchSongs = async () => {
      fetchMoreSongs(dispatch, currentPage, keyword);
    };
    fetchSongs();
  }, [dispatch, currentPage, keyword]);
  return (
    <Layout playlistCreate={() => setPlaylistCreate(true)}>
      <Navbar />
      <div className="tertiary_bg ml-2 p-4 home">
        <div className="flex justify-between items-center mb-4 pt-4">
          <span className="text-xl font-bold hover:underline cursor-pointer">
            Focus
          </span>
          <span>Show All</span>
        </div>
        {
          <div className="min-h-screen ">
            <InfiniteScroll
              dataLength={filteredSongsCount}
              next={nextPage}
              hasMore={hasMore}
              loader={hasMore && loading && <Loader />}
              scrollThreshold={0.9}>
              {
                <div className="cardItem">
                  {songs &&
                    songs.length > 0 &&
                    songs.map((song, i) => (
                      <Card idx={i} key={song._id} song={song} />
                    ))}
                </div>
              }
            </InfiniteScroll>
          </div>
        }
        <div className="flex justify-between my-4 items-center">
          <span className="text-xl font-bold hover:underline cursor-pointer">
            Spotify List
          </span>
          <span>Show All</span>
        </div>
      </div>
      <SongBar />
    </Layout>
  );
};

export default Home;
