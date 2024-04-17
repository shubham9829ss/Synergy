import Layout from "../Layout";
import { FaAngleLeft, FaAngleRight, FaSearch, FaUser } from "react-icons/fa";
import Card from "../components/Card/Card";
import SongBar from "../components/MasterBar/SongBar";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { songsRequest, songsSuccess, songsFail } from "../redux/songSlice";
// import InfiniteScroll from "react-infinite-scroll-component";

// export const songs = [
//   {
//     id: Math.random() * Date.now(),
//     title: "Akhiyaan Gulaab",
//     artist: "Mitraz",
//     mp3: new Audio("/assets/mp3/Akhiyaan Gulaab Mitraz.mp3"),
//     img: "/assets/akhiyan gulab.jpg",
//   },
//   {
//     id: Math.random() * Date.now(),
//     title: "Teri Khushboo",
//     artist: "Arijit Singh",
//     mp3: new Audio("/assets/mp3/Teri Khushboo.mp3"),
//     img: "/assets/Arijit-2.jpg",
//   },
//   {
//     id: Math.random() * Date.now(),
//     title: "Heeriye",
//     artist: "Arijit Singh",
//     mp3: new Audio("/assets/mp3/Heeriye.mp3"),
//     img: "/assets/Heeriye.jpg",
//   },
//   {
//     id: Math.random() * Date.now(),
//     title: "Judaiyaan",
//     artist: "Arijit Singh",
//     mp3: new Audio("/assets/mp3/Judaiyaan.mp3"),
//     img: "/assets/judayiyan.webp",
//   },
//   {
//     id: Math.random() * Date.now(),
//     title: "Heeriye",
//     artist: "Arijit Singh",
//     mp3: new Audio("/assets/mp3/Heeriye.m4a"),
//     img: "/assets/Arijit-1.jpg",
//   },
//   {
//     id: Math.random() * Date.now(),
//     title: "Bandeya",
//     artist: "Arijit Singh",
//     mp3: new Audio("/assets/mp3/Bandeya.mp3"),
//     img: "/assets/Arijit-2.jpg",
//   },
// ];
// const fetchMoreSongs = async (lastSongId, dispatch) => {
//   try {
//     dispatch(songsRequest());
//     const res = await fetch(`/api/songs?lastSongId=${lastSongId}`);
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     dispatch(songsFail(error));
//     return null;
//   }
// };

const Home = () => {
  const dispatch = useDispatch();
  const [lastSongId, setLastSongId] = useState(null);
  const { songs, loading, error } = useSelector((state) => state.songs);
  // const handleLoadMore = () => {
  //   if (songs && songs.length > 0) {
  //     const id = songs[songs.length - 1]._id.toString();
  //     setLastSongId(id);
  //   }
  // };
  // useEffect(() => {
  //   const { data, hasMore } = fetchMoreSongs(lastSongId, dispatch);
  //   if (data && data.length > 0) {
  //     dispatch(songsSuccess(data));
  //   }
  // }, [lastSongId]);
  return (
    <Layout>
      {/* <Navbar /> */}
      <div>hi</div>
      {/* <div className="tertiary_bg ml-2 p-4 home">
        <div className="flex justify-between items-center mb-4 pt-4">
          <span className="text-xl font-bold hover:underline cursor-pointer">
            Focus
          </span>
          <span>Show All</span>
        </div>
        <div className="grid gap-6 grid-cols-5">
          {songs &&
            songs.length > 0 &&
            songs.map((song, i) => {
              return <Card key={song.id} idx={i} song={song} />;
            })}
        </div>
        <div className="flex justify-between my-4 items-center">
          <span className="text-xl font-bold hover:underline cursor-pointer">
            Spotify List
          </span>
          <span>Show All</span>
        </div>
        <div className="grid  gap-6 grid-cols-5">
          <InfiniteScroll
            dataLength={songs.length}
            next={handleLoadMore}
            hasMore={true}
            loader={<p>Loading...</p>}
            endMessage={<h4>End of Songs</h4>}>
            {songs &&
              songs.length > 0 &&
              songs.map((song, i) => {
                return <Card key={song._id} idx={i} song={song} />;
              })}
          </InfiniteScroll>
          {loading && <p>Loading more songs...</p>}
          {error && <p>Error: {error}</p>}
        </div>
      </div> */}
      {/* <SongBar /> */}
    </Layout>
  );
};

export default Home;
