import loginService from "../../services/login";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import blogService from "../../services/blog";
import { useAuthDispatch, useAuthState } from "../../contexts/AuthContext";
import { useState } from "react";
import { useNotify } from "../../contexts/NotificationContext";
import { notifications } from "@mantine/notifications";

export const useLogout = () => {
  const { clearUser } = useAuthDispatch();

  const logout = () => {
    clearUser();
    localStorage.removeItem("loggedUser");
  };

  return {
    logout,
  };
};

export const useLogin = () => {
  const { setUser } = useAuthDispatch();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: loginService.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Blog"] });
    },
  });

  const handleLogin = async (credentials) => {
    try {
      const user = await loginMutation.mutateAsync(credentials);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);

      notifications.show({
        title: "Info",
        message: `Logged in as '${user.username}'`,
        position: "top-center",
        autoClose: 5000,
        color: "green",
      });
    } catch (error) {
      console.log(error);
      notifications.show({
        title: "Info",
        message: `Login failed. ${error.message || error.response.data.error}`,
        position: "top-center",
        autoClose: 5000,
        color: "red",
      });
    }
  };

  return {
    handleLogin,
  };
};

export const useInitializeAuth = () => {
  const user = useAuthState();
  const [authInitializing, setAuthInitializing] = useState(true);

  const { setUser } = useAuthDispatch();

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("loggedUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setAuthInitializing(false);
      blogService.setToken(user.token);
    } else if (!loggedUserJSON) {
      setAuthInitializing(false);
    }
  }, []);

  return { user, authInitializing };
};
