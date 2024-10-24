import { useEffect } from "react";
import { Title, Text, List, rem, Anchor } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Link } from "react-router-dom";

const User = ({ user, isPending, isError, error }) => {
  useEffect(() => {
    if (isError)
      notifications.show({
        title: "Info",
        message: `${error.message}. Failed to get users`,
        position: "top-center",
        autoClose: 5000,
        color: "red",
      });
  }, [isError, error]);

  if (isPending) return <p>loading user...</p>;

  if (!user) return null;

  return (
    <div>
      <Title mb={rem(5)} order={3}>
        {user.name}'s added blogs
      </Title>
      {user.blogs.length === 0 && <Text>No blogs found</Text>}
      <List listStyleType="disc">
        {user.blogs.map((blog) => (
          <List.Item key={blog.id}>
            <Anchor component={Link} to={`/blogs/${blog.id}`}>
              {blog.title}
            </Anchor>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default User;
