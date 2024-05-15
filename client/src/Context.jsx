import { createContext, useContext, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [searchClicked, setSearchClicked] = useState(false);
  const [currTime, setCurrTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");
  const [progress, setProgress] = useState(0);
  const [songIdx, setSongIdx] = useState(0);
  const [filterredSongs, setFilterredSongs] = useState([]);
  const dispatch = useDispatch();
  const resetEverything = () => {
    setProgress(0);
    setCurrTime("00:00");
    setDuration("00:00");
  };

  return (
    <AppContext.Provider
      value={{
        searchClicked,
        setSearchClicked,
        currTime,
        setCurrTime,
        duration,
        setDuration,
        progress,
        setProgress,
        resetEverything,
        songIdx,
        setSongIdx,
        filterredSongs,
        setFilterredSongs,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
