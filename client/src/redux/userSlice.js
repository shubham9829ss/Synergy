import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isAuthenticated: false,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = false;
      state.isAuthenticated = false;
    },
    signInSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = true;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isAuthenticated = false;
    },
    signOut: (state) => {
      state.error = false;
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
  },
});

export const { signInStart, signInSuccess, signInFailure, signOut } =
  userSlice.actions;
export default userSlice.reducer;
