import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "../Pages/Music/Music.reducer";

export const store = configureStore({
  reducer: {
    music: musicReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;