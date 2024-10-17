import userService from "../services/users";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
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
