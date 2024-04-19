import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songs: [],
  loading: false,
  error: null,
  filteredSongsCount: 1,
  totalSongs: 3,
  resultPerPage: 2,
  hasMore: true,
  keyword: "",
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
      state.songs = action.payload.songs;
      state.hasMore = action.payload.hasMore;
      state.resultPerPage = action.payload.resultPerPage;
      state.totalSongs = action.payload.totalSongs;
      state.filteredSongsCount = action.payload.filteredSongsCount;
    },
    songsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetSongs: (state) => {
      state.loading = false;
      state.error = null;
      state.songs = [];
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
  },
});

export const { songsRequest, songsSuccess, songsFail, resetSongs, setKeyword } =
  songSlice.actions;
export default songSlice.reducer;
