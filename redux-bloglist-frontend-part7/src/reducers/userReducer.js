import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blog";
import loginService from "../services/login";
import { notifyWith } from "./notificationReducer";

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
const { setUser, removeUser } = userSlice.actions;

export const initializeUserIfStored = () => (dispatch) => {
  const loggedUserJSON = localStorage.getItem("loggedUser");

  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    dispatch(setUser(user));
    blogService.setToken(user.token);
  }
};

export const loginWith = (username, password) => async (dispatch) => {
  try {
    const user = await loginService.login({
      username,
      password,
    });
    window.localStorage.setItem("loggedUser", JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch(setUser(user));

    dispatch(notifyWith(`logged in as '${user.username}'`));
  } catch (exception) {
    dispatch(notifyWith(exception.response.data.error, "error"));
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("loggedUser");
  dispatch(removeUser());
};
