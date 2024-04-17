import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playlists: {},
  loading: false,
  error: null,
  message: "",
  success: false,
};

const playlistSlice = createSlice({
  name: "myPlaylist",
  initialState,
  reducers: {
    myPlaylistRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    myPlaylistSuccess: (state, action) => {
      state.loading = false;
      state.playlists = action.payload;
      state.success = true;
    },
    myPlaylistFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    delPlaylistRequest: (state) => {
      state.loading = true;
    },
    delPlaylistSuccess: (state, action) => {
      state.loading = false;
      state.playlists.filter((playlist) => playlist._id !== action.payload);
    },
    delPlaylistFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  myPlaylistRequest,
  myPlaylistSuccess,
  myPlaylistFail,
  delPlaylistRequest,
  delPlaylistSuccess,
  delPlaylistFail,
} = playlistSlice.actions;
export default playlistSlice.reducer;
