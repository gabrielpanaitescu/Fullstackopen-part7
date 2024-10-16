import { useQuery } from "@tanstack/react-query";
import userService from "../services/users";
import User from "./User";

const Users = () => {
  const {
    data: users = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["User"],
    queryFn: userService.getUsers,
  });

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Nr of Blogs</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </tbody>
    </table>
  );
};

export default Users;
