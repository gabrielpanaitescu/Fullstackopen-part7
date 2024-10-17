import { useNotify } from "../contexts/NotificationContext";
import { useRef, useState } from "react";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { useBlogApi } from "../hooks/blogApiHooks";
import { Link } from "react-router-dom";

const Blogs = () => {
  const blogFormRef = useRef();
  const notifyWith = useNotify();
  const [isBlurred, setIsBlurred] = useState(false);
  const {
    blogs,
    isGetBlogsPending,
    isGetBlogsError,
    getBlogsError,
    createBlogMutation,
  } = useBlogApi();

  const addBlog = async (blogObject) => {
    setIsBlurred(true);
    blogFormRef.current.toggleVisibility();

    createBlogMutation.mutate(blogObject, {
      onSuccess: (returnedBlog) => {
        setIsBlurred(false);
        notifyWith(
          `Added blog ${returnedBlog.title} by ${returnedBlog.author}`
        );
      },
      onError: () => {
        setIsBlurred(false);
      },
    });
  };

  const blurredStyles = isBlurred
    ? {
        filter: "blur(3px)",
        paddingLeft: 0,
      }
    : {
        paddingLeft: 0,
      };

  if (isGetBlogsPending) return <div>loading...</div>;

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  const blogStyle = {
    listStyle: "none",
    border: "1px solid",
    padding: "7px 14px",
    marginBottom: 10,
  };

  return (
    <>
      <h3>Blogs</h3>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <ul style={blurredStyles}>
        {sortedBlogs.map((blog) => (
          <li key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Blogs;
