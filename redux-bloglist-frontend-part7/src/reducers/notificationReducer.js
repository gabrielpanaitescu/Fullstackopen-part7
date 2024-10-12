import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: null },
  reducers: {
    setNotification(_, action) {
      return action.payload;
    },
    clearNotification() {
      return { message: null };
    },
  },
});

const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

export const notifyWith =
  (message, type = "info", seconds = 5) =>
  (dispatch) => {
    const payload = {
      message,
      type,
    };

    dispatch(setNotification(payload));

    setTimeout(() => {
      dispatch(clearNotification());
    }, 1000 * seconds);
  };
