import { useEffect } from "react";
import { useNotify } from "../contexts/NotificationContext";
const User = ({ user, isPending, isError, error }) => {
  const notifyWith = useNotify();

  useEffect(() => {
    if (isError) notifyWith(`${error.message}. Failed to get users`, "error");
  }, [isError, error]);

  if (isPending) return <p>loading user...</p>;

  if (!user) return null;

  return (
    <div>
      <h3>{user.name}'s added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
