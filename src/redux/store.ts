import { configureStore } from "@reduxjs/toolkit";
import booksSlice from "./booksSlice";

export const store = configureStore({
  reducer: {
    booksSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
