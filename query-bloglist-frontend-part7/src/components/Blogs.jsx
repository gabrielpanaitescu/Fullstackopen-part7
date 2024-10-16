import { useNotify } from "../contexts/NotificationContext";
import { useEffect, useRef, useState } from "react";
import Blog from "./Blog";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { useBlogApi } from "../hooks/blogApiHooks";
import { useAuthDispatch, useAuthState } from "../contexts/AuthContext";

const Blogs = () => {
  const user = useAuthState();
  const blogFormRef = useRef();
  const notifyWith = useNotify();
  const [isBlurred, setIsBlurred] = useState(false);
  const {
    blogs,
    isGetBlogsPending,
    isGetBlogsError,
    getBlogsError,
    createBlogMutation,
    updateBlogMutation,
    deleteBlogMutation,
  } = useBlogApi();
  const { clearUser } = useAuthDispatch();

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

  const updateLikesOf = async (blogId) => {
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

    deleteBlogMutation.mutate(id);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    clearUser();
  };

  const blurredStyles = isBlurred
    ? {
        filter: "blur(3px)",
      }
    : {};

  if (isGetBlogsPending) return <div>loading...</div>;

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <>
      <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <h2>Create new blog</h2>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <ul style={blurredStyles}>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateLikes={() => updateLikesOf(blog.id)}
          >
            {user.username === blog.user.username && (
              <button onClick={() => deleteBlog(blog)}>remove</button>
            )}
          </Blog>
        ))}
      </ul>
    </>
  );
};

export default Blogs;
