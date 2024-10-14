import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blog";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    removeUser() {
      return null;
    },
  },
});

export default userSlice.reducer;
export const { setUser, removeUser } = userSlice.actions;

export const initializeUserIfStored = () => (dispatch) => {
  const loggedUserJSON = localStorage.getItem("loggedUser");

  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    dispatch(setUser(user));
    blogService.setToken(user.token);
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("loggedUser");
  dispatch(removeUser());
};
