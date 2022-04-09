import { createSlice } from "@reduxjs/toolkit";

export enum ThemeMode {
  light = "light",
  dark = "dark",
}

export interface IThemeState {
  mode: ThemeMode;
}

const initialState: IThemeState = {
  mode: ThemeMode.light,
};

export const themeSliceName = "theme";

export const themeSlice = createSlice({
  name: themeSliceName,
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
