import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useRef, useState, useEffect } from "react";
import { logout } from "../reducers/userReducer";
import {
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useGetBlogsQuery,
  useUpdateBlogMutation,
} from "../services/apiSlice";
import { notifyWith } from "../reducers/notificationReducer";

const Blogs = () => {
  const [isBlurred, setIsBlurred] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();
  const [createBlog, { isLoading: isCreateLoading }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: isUpdateLoading }] = useUpdateBlogMutation();
  const [deleteBlog, { isLoading: isDeleteLoading }] = useDeleteBlogMutation();

  const {
    data: blogs = [],
    isLoading,
    isSuccess,
    isError,
    isFetching,
    error,
  } = useGetBlogsQuery();

  const sortedBlogs = useMemo(() => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
    return sortedBlogs;
  }, [blogs]);

  useEffect(() => {
    if (!isFetching && !isCreateLoading) {
      setIsBlurred(false);
    }
  }, [isFetching, isCreateLoading, isUpdateLoading]);

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    setIsBlurred(true);
    try {
      const returnedBlog = await createBlog(blogObject).unwrap();
      dispatch(
        notifyWith(
          `successfully created blog ${returnedBlog.title} by ${returnedBlog.author}`
        )
      );
    } catch (error) {
      console.log(error);
      setIsBlurred(false);
    }
  };

  const updateLikesOf = async (blogId) => {
    const blogToUpdate = blogs.find((blog) => blog.id === blogId);
    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
      user: blogToUpdate.user.id,
    };

    try {
      await updateBlog({
        id: blogId,
        updatedBlog,
      }).unwrap();
    } catch (exception) {
      dispatch(notifyWith(exception.message, "error"));
    }
  };

  const deleteBlogWith = async ({ id, title, author }) => {
    const confirmation = window.confirm(
      `Remove blog '${title}' by '${author}'`
    );
    if (!confirmation) return;

    try {
      await deleteBlog(id).unwrap();
      dispatch(notifyWith(`successfully deleted blog ${title} by ${author}`));
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isError) {
    dispatch(notifyWith(error.error.toString(), "error"));
    return;
  }

  const styles = isBlurred
    ? {
        filter: "blur(5px)",
      }
    : {};

  return (
    <>
      <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div style={styles}>
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
        </div>
      )}
    </>
  );
};

export default Blogs;
