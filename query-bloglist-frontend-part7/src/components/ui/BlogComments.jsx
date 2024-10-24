import { useRef, useState } from "react";
import Togglable from "./Togglable";
import { useBlogs } from "../../hooks/query/useBlogs";
import { Button, Flex, Skeleton, Stack, Textarea, Title } from "@mantine/core";
import Comment from "./Comment/Comment";

const BlogComments = ({ blog }) => {
  const [text, setText] = useState("");
  const blogCommentsRef = useRef();
  const { blogCommentMutation } = useBlogs();
  const [isBlurred, setIsBlurred] = useState(false);

  const handleSubmit = (e) => {
    setIsBlurred(true);
    e.preventDefault();
    blogCommentsRef.current.toggleVisibility();
    blogCommentMutation.mutate(
      { id: blog.id, text },
      {
        onSettled: () => {
          setIsBlurred(false);
        },
      }
    );
  };
  console.log(isBlurred);

  return (
    <Stack>
      <Title order={4}>Comments</Title>
      <Togglable buttonLabel="new" ref={blogCommentsRef}>
        <form onSubmit={handleSubmit}>
          <Stack align="start">
            <Textarea
              description="Type your comment and press post!"
              placeholder="This blog was awesome...."
              value={text}
              required
              onChange={(e) => setText(e.target.value)}
            />
            <Button type="submit" color="teal">
              Post
            </Button>
          </Stack>
        </form>
      </Togglable>
      <Flex direction="column" gap="sm">
        {blog.comments.map((comment, index) => {
          return isBlurred ? (
            <Skeleton h={100} w={400} animate={true} />
          ) : (
            <Comment key={index} comment={comment} />
          );
        })}
      </Flex>
    </Stack>
  );
};
export default BlogComments;
