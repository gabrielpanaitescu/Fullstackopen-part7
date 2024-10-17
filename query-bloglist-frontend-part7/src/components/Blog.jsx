import { useState } from "react";
import { useBlogApi } from "../hooks/blogApiHooks";
import { useAuthState } from "../contexts/AuthContext";

const Blog = ({ blog }) => {
  const user = useAuthState();
  const { blogs, updateBlogMutation, deleteBlogMutation } = useBlogApi();

  if (!blog) return null;

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

    deleteBlogMutation.mutate(id);
  };

  return (
    <section>
      <h2>{blog.title}</h2>
      <p>
        link:<a> {blog.url}</a>
      </p>
      <div className="likesDiv">
        {blog.likes} likes <button onClick={updateLikes}>like</button>
      </div>
      <div>
        <span>added by {blog.author}</span>
        {user.username === blog.user.username && (
          <button onClick={() => deleteBlog(blog)}>remove</button>
        )}
      </div>
    </section>
  );
};

export default Blog;
