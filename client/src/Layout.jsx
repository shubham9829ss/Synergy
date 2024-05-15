import Sidebar from "./components/Sidebar";
import PlaylistUpdate from "./components/PlaylistUpdate";
import { useState } from "react";
const Layout = ({ children }) => {
  const [updatePlaylist, setUpdatePlaylist] = useState(false);
  const [data, setData] = useState({});

  return (
    <div className="flex gap-2">
      <Sidebar
        updatePlaylist={() => setUpdatePlaylist(true)}
        setData={setData}
        className="hidden sm:fixed sm:w-1/4"
      />
      <div className="w-full sm:w-3/4 absolute right-0 top-0">{children}</div>
      {updatePlaylist && (
        <PlaylistUpdate onClose={() => setUpdatePlaylist(false)} data={data} />
      )}
    </div>
  );
};

export default Layout;
