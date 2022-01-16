import { createSlice } from "@reduxjs/toolkit";

export interface Istate {
  type: "default" | "success" | "error";
  text: string;
  duration: number;
  isActive: boolean;
}

const initialState: Istate = {
  type: "default",
  text: "",
  duration: 3000,
  isActive: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    showNotification(state, action) {
      state.type = action.payload.type;
      state.text = action.payload.text;
      state.isActive = true;
    },
    removeNotification(state) {
      state.isActive = false;
      state.text = initialState.text;
      state.type = initialState.type;
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice;
