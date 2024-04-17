import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import controlReducer from "./controlSlice.js";
import userReducer from "./userSlice.js";
import playlistReducer from "./playlistSlice.js";
import songReducer from "./songSlice.js";

const rootReducer = combineReducers({
  account: userReducer,
  mainSong: controlReducer,
  playlists: playlistReducer,
  songs: songReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
