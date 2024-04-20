import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  masterSong: {},
  isPlaying: false,
  error: null,
  checkNewSong: false,
  repeat: false,
  shuffle: false,
};

const controlSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    playStart: (state, action) => {
      state.isPlaying = true;
      state.error = null;
      state.checkNewSong = true;
      state.masterSong = {
        ...action.payload,
      };
    },
    playStop: (state) => {
      state.isPlaying = false;
      state.error = null;
    },
    playError: (state, action) => {
      state.error = action.payload;
    },
    playBar: (state) => {
      state.isPlaying = true;
    },
    pauseBar: (state) => {
      state.isPlaying = false;
    },
    setCheckNewSong: (state, action) => {
      state.checkNewSong = action.payload;
    },
    setRepeat: (state) => {
      state.repeat = !state.repeat;
    },
    setShuffle: (state) => {
      state.shuffle = !state.shuffle;
    },
  },
});

export const {
  playStart,
  playStop,
  playError,
  playBar,
  pauseBar,
  setCheckNewSong,
  setRepeat,
  setShuffle,
} = controlSlice.actions;
export default controlSlice.reducer;
