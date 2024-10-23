import userService from "../../services/users";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

export const useCreateUser = () => {
  const queryClient = new QueryClient();

  const createUserMutation = useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["User"] });
      notifications.show({
        title: "Info",
        message: `New user created successfully`,
        position: "top-center",
        autoClose: 5000,
        color: "green",
      });
    },
    onError: (error) => {
      console.log(error);
      notifications.show({
        title: "Info",
        message: `Failed to create user. ${error.message}`,
        position: "top-center",
        autoClose: 5000,
        color: "red",
      });
    },
  });

  return createUserMutation;
};

export const useGetUsers = () => {
  const {
    data: users = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["User"],
    queryFn: userService.getUsers,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return { users, isPending, isError, error };
};
