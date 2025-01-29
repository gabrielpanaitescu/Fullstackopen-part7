import { useBlogs } from "../../hooks/query/useBlogs";
import { useAuthState } from "../../contexts/AuthContext";
import BlogComments from "../../components/ui/BlogComments";
import ErrorElement from "./ErrorElement";
import { useNavigate } from "react-router-dom";
import {
  Anchor,
  Button,
  Card,
  Center,
  Group,
  Loader,
  rem,
  Stack,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

export const BlogDetails = ({ blog, user, deleteBlog, updateLikes }) => (
  <Card padding="lg" radius="md" maw={rem(500)}>
    <Card.Section withBorder inheritPadding py="xs" mb="xs">
      <Stack>
        <Text fw={700}>{blog.title}</Text>
        <Text fs="italic">by {blog.author}</Text>
      </Stack>
    </Card.Section>
    <Stack align="start">
      <Anchor href={blog.url}>Link</Anchor>
      <Group>
        <Text>
          {blog.likes} {blog.likes <= 1 ? "like" : "likes"}
        </Text>
        <Button
          size="compact-sm"
          color="teal"
          onClick={() => updateLikes(blog)}
        >
          like
        </Button>
      </Group>
      {user.username === blog.user.username && (
        <Button size="compact-sm" color="red" onClick={() => deleteBlog(blog)}>
          remove
        </Button>
      )}
    </Stack>
  </Card>
);

const Blog = ({ blog }) => {
  const user = useAuthState();
  const navigate = useNavigate();
  const { blogs, updateBlogMutation, deleteBlogMutation, isGetBlogsPending } =
    useBlogs();

  console.log("user", user);

  const updateLikes = async (blog) => {
    const blogId = blog.id;
    const blogToUpdate = blogs.find((blog) => blog.id === blogId);
    const updatedBlog = {
      ...blogToUpdate,
      user: blogToUpdate.user.id,
      likes: blogToUpdate.likes + 1,
    };

    updateBlogMutation.mutate(updatedBlog);
  };

  const deleteBlog = async ({ id, title, author }) => {
    const confirmation = window.confirm(
      `Remove blog '${title}' by '${author}'`
    );
    if (!confirmation) return;

    deleteBlogMutation.mutate(id, {
      onSuccess: (_returnedBlog) => {
        notifications.show({
          title: "Info",
          message: `Successfully deleted blog '${title}'`,
          position: "top-center",
          autoClose: 5000,
          color: "green",
        });
        navigate("/blogs");
      },
    });
  };

  if (isGetBlogsPending) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }
  if (!blog)
    return <ErrorElement error={{ status: 404, statusText: "Not found" }} />;

  return (
    <Stack direction="column" gap={50}>
      <BlogDetails
        blog={blog}
        user={user}
        updateLikes={updateLikes}
        deleteBlog={deleteBlog}
      />
      <BlogComments blog={blog} />
    </Stack>
  );
};

export default Blog;
