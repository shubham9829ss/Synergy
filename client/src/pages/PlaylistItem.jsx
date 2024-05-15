import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import "./PlaylistItem.css";
import { useTable, useSortBy } from "react-table";
import { useParams } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { IoMdArrowDropright } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin7Line } from "react-icons/ri";
import { MdOutlinePersonSearch } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { useSelector } from "react-redux";
const columns = [
  {
    Header: "#",
    accessor: (row, index) => index + 1,
  },
  {
    Header: "Title",
    accessor: "songTitle",
  },
  {
    Header: "Album",
    accessor: "songArtist",
    Cell: ({ value }) => {
      if (Array.isArray(value)) {
        return value.map((artist) => artist.replace(/["\[\]]/g, "")).join(", ");
      }
      return value;
    },
  },
  {
    Header: "Date Added to Playlist",
    accessor: "dateAdded",
    Cell: ({ value }) => {
      const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      const formattedDate = formatter.format(value);
      return formattedDate;
    },
  },
  {
    Header: "Duration",
    accessor: "songDuration",
    Cell: ({ value }) => {
      const formatDuration = (duration) => {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      };
      return formatDuration(value);
    },
  },
];

function PlaylistItem() {
  const [songs, setSongs] = useState([]);
  const { playlists } = useSelector((state) => state.playlists);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);
  const { playlistId } = useParams();
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [focused, setFocused] = useState(false);
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await fetch(`/api/playlist/${playlistId}`);
        const d = await res.json();
        const fetchedSongs = await Promise.all(
          d.playlist.songs.map(async (songId) => {
            const songRes = await fetch(`/api/songs/${songId}`);
            const songData = await songRes.json();
            return songData.song;
          })
        );
        setSongs(fetchedSongs);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [playlistId]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: songs }, useSortBy);

  const handleAddToPlaylistClick = () => {
    setShowAddToPlaylist(!showAddToPlaylist);
  };

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      const playlistDiv = document.getElementById("menu");
      if (playlistDiv && !playlistDiv.contains(event.target)) {
        console.log("hi");
        setShowMenu(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  const handlePlaylist = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowAddToPlaylist(true);
  };
  const handleMenuClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchText(searchTerm);
    const filtered = playlists.filter((p) =>
      p.title.toLowerCase().includes(searchTerm)
    );
    setFilteredPlaylists(filtered);
  };
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
  console.log(playlists);
  return (
    <Layout>
      <div className="container">
        {songs.length > 0 ? (
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((hg) => (
                <tr {...hg.getHeaderGroupProps()}>
                  {hg.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render("Header")}
                      {column.isSorted && (
                        <span>{column.isSortedDesc ? " 🔽" : " 🔼"}</span>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, index) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <React.Fragment key={cell.getCellProps().key}>
                        <td
                          {...cell.getCellProps()}
                          className=""
                          onMouseEnter={() => setHoveredRowIndex(index)}
                          onMouseLeave={() => {
                            setHoveredRowIndex(null);
                            setShowMenu(false);
                            setShowAddToPlaylist(false);
                          }}>
                          <div className="relative">
                            <span>{cell.render("Cell")}</span>
                            {cell.column.id === "songDuration" &&
                              index === hoveredRowIndex && (
                                <span className="absolute mx-5 my-auto pt-[2px]">
                                  <BsThreeDots
                                    id="menu"
                                    className="text-xl"
                                    onClick={handleMenuClick}
                                  />
                                  {cell.column.id === "songDuration" &&
                                    index === hoveredRowIndex &&
                                    showMenu && (
                                      <div
                                        className="absolute top-full right-0
                                 z-10 w-[190px] ">
                                        <div className="shadow-md rounded-md p-1 m-0 bg-slate-700 text-white">
                                          <button
                                            className="flex justify-between w-full text-left text-xs cursor-pointer hover:bg-gray-600 px-1 py-1 rounded-md"
                                            onMouseEnter={() => {
                                              setShowAddToPlaylist(true);
                                            }}
                                            onMouseLeave={() =>
                                              setShowAddToPlaylist(false)
                                            }>
                                            <span className="flex">
                                              <span>
                                                <AiOutlinePlus />
                                              </span>
                                              <span className="pl-2">
                                                Add to playlist
                                              </span>
                                            </span>
                                            <span className="">
                                              <IoMdArrowDropright className="text-lg mr-1" />
                                            </span>
                                          </button>
                                          <button className="flex gap-x-2 w-full text-left text-xs cursor-pointer hover:bg-gray-600 rounded-md px-1 py-1">
                                            <span>
                                              <RiDeleteBin7Line />
                                            </span>
                                            <span>
                                              Remove from this playlist
                                            </span>
                                          </button>
                                          <button className="flex gap-2 w-full text-left text-xs cursor-pointer hover:bg-gray-600 rounded-md px-1 py-1">
                                            <span>
                                              <MdOutlinePersonSearch />
                                            </span>
                                            <span>Go to Artist</span>
                                          </button>
                                        </div>
                                        {(showAddToPlaylist || focused) && (
                                          <div
                                            className="absolute top-1 right-[189px]
                                 z-10 w-[190px] "
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
                                                  onClick={handlePlaylist}
                                                  placeholder={
                                                    "Search a playlist"
                                                  }
                                                  className="flex justify-between w-full text-left text-xs outline-none bg-gray-600 px-1 py-1 rounded-sm"
                                                />
                                              </div>
                                              <hr />
                                              {playlists.length > 0 && (
                                                <div>{displayPlaylists()}</div>
                                              )}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                </span>
                              )}
                          </div>
                        </td>
                      </React.Fragment>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p> // Render a loading message while fetching songs
        )}
      </div>
    </Layout>
  );
}

export default PlaylistItem;
