import { createSlice } from "@reduxjs/toolkit";

let themeMode;
if (typeof window !== "undefined") {
  themeMode = localStorage.theme || "light";
}

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: themeMode },
  reducers: {
    toggle(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const uiActions = themeSlice.actions;

export default themeSlice;
