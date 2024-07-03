import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import "./PlaylistItem.css";
import { useTable, useSortBy } from "react-table";
import { useParams } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";
import Menu from "../components/Menu";

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
  const { playlistId } = useParams();
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
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

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
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
                                  <Menu showMenu={showMenu} />
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
          <p>Loading...</p>
        )}
      </div>
    </Layout>
  );
}

export default PlaylistItem;
