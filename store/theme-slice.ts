import { createSlice } from "@reduxjs/toolkit";

let themeMode;
if (typeof window !== "undefined") {
  themeMode = localStorage.theme || "light";
}

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: themeMode },
  reducers: {
    toggle(state, action) {
      state.mode = action.payload;
    },
  },
});

export const uiActions = themeSlice.actions;

export default themeSlice;
