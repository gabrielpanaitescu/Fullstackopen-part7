import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
} from "../reducers/blogReducer";
import { logout } from "../reducers/userReducer";

const Blogs = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  const blogs = useSelector((state) => state.blogs);

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blogObject));
  };

  const updateLikesOf = async (blogId) => {
    dispatch(likeBlog(blogId));
  };

  const deleteBlogWith = async ({ id, title, author }) => {
    const confirmation = window.confirm(
      `Remove blog '${title}' by '${author}'`
    );
    if (!confirmation) return;

    dispatch(deleteBlog(id));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

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
      <ul style={{ padding: 0 }}>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateLikes={() => updateLikesOf(blog.id)}
          >
            {user.username === blog.user.username && (
              <button onClick={() => deleteBlogWith(blog)}>remove</button>
            )}
          </Blog>
        ))}
      </ul>
    </>
  );
};

export default Blogs;
