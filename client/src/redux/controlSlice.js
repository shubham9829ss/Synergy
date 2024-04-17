import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  masterSong: {},
  isPlaying: false,
  error: null,
};

const controlSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    playStart: (state, action) => {
      state.isPlaying = true;
      state.error = null;
      state.masterSong = action.payload;
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
  },
});

export const { playStart, playStop, playError, playBar, pauseBar } =
  controlSlice.actions;
export default controlSlice.reducer;
