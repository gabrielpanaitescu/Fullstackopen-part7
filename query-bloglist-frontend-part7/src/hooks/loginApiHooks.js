import loginService from "../services/login";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import blogService from "../services/blog";
import { useAuthDispatch, useAuthState } from "../contexts/AuthContext";
import { useState } from "react";
import { useNotify } from "../contexts/NotificationContext";

export const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useAuthState();
  const { setUser } = useAuthDispatch();
  const queryClient = useQueryClient();
  const notifyWith = useNotify();

  const loginMutation = useMutation({
    mutationFn: loginService.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Blog"] });
    },
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginMutation.mutateAsync({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      notifyWith(`logged in as '${user.username}'`);
    } catch (error) {
      notifyWith(error.response.data.error, "error");
    }
  };

  return {
    user,
    username,
    password,
    setUsername,
    setPassword,
    handleLogin,
  };
};

export const useInitializeAuth = () => {
  const user = useAuthState();
  const { setUser } = useAuthDispatch();

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("loggedUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return user;
};
