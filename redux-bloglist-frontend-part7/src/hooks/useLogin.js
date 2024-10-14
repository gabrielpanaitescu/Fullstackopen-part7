import { useState } from "react";
import { useLoginMutation } from "../services/apiSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userReducer";
import { notifyWith } from "../reducers/notificationReducer";

export const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, mutationStatus] = useLoginMutation();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await login({ username, password }).unwrap();
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      dispatch(setUser(user));
      dispatch(notifyWith(`logged in as '${user.username}'`));
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(notifyWith(exception.data.error, "error"));
    }
  };

  return {
    username,
    password,
    setUsername,
    setPassword,
    handleLogin,
    mutationStatus,
  };
};
