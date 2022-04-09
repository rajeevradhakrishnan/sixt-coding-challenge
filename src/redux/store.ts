import { configureStore } from "@reduxjs/toolkit";
import offers from "./offers/offerSlice";
import theme from "./theme/themeSlice";

export const store = configureStore({
  reducer: { theme, offers },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
