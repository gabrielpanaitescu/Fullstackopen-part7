import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification(state) {
      return null;
    },
  },
});

export const sendNotification = (message) => (dispatch, getState) => {};
