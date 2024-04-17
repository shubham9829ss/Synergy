import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songs: [],
  totalSongs: 0,
  songsCount: 0,
  pageNumber: 0,
  loading: false,
  error: null,
  success: false,
};

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    songsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    songsSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.songs = [...state.songs, ...action.payload];
      state.success = true;
    },
    songsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    resetSongs: (state) => {
      state.loading = false;
      state.error = null;
      state.songs = [];
    },
  },
});

export const { songsRequest, songsSuccess, songsFail, resetSongs } =
  songSlice.actions;
export default songSlice.reducer;
