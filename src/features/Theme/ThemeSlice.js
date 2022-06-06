import { createSlice } from "@reduxjs/toolkit";
import { THEMEKEY } from "../../utils/constants";

const initialState = {
  theme: localStorage.getItem(THEMEKEY) || "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    handleDarkTheme: (state) => {
      localStorage.setItem(THEMEKEY, "dark");
      state.theme = "dark";
    },
    handleLightTheme: (state) => {
      localStorage.setItem(THEMEKEY, "light");
      state.theme = "light";
    },
  },
});

export const { handleDarkTheme, handleLightTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
