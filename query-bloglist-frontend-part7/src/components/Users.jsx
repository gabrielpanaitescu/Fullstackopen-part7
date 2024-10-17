import { Link } from "react-router-dom";
import { useUsers } from "../hooks/userApiHooks";
import { useNotify } from "../contexts/NotificationContext";
import { useEffect } from "react";

const Users = () => {
  const { users, isPending, isError, error } = useUsers();
  const notifyWith = useNotify();

  useEffect(() => {
    if (isError) notifyWith(`${error.message}. Failed to get users`, "error");
  }, [isError, error]);

  if (isPending) return <div>loading...</div>;

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
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Users;
