import { useBlogApi } from "../hooks/blogApiHooks";
import { useAuthState } from "../contexts/AuthContext";
import BlogComments from "./BlogComments";
import { useNavigate } from "react-router-dom";
import { useNotify } from "../contexts/NotificationContext";

const Blog = ({ blog }) => {
  const user = useAuthState();
  const navigate = useNavigate();
  const { blogs, updateBlogMutation, deleteBlogMutation } = useBlogApi();
  const notifyWith = useNotify();

  if (!blog) return null;

  console.log(blog);

  const updateLikes = async (blog) => {
    const blogId = blog.id;
    const blogToUpdate = blogs.find((blog) => blog.id === blogId);

    console.log(blog);
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
      onSuccess: (returnedBlog) => {
        console.log(returnedBlog);
        notifyWith(`Successfully deleted blog ${returnedBlog.title}`);
        navigate("/blogs");
      },
    });
  };

  return (
    <section>
      <h2>{blog.title}</h2>
      <p>
        link:<a> {blog.url}</a>
      </p>
      <div className="likesDiv">
        {blog.likes} likes{" "}
        <button onClick={() => updateLikes(blog)}>like</button>
      </div>
      <div>
        <span>added by {blog.author}</span>
        {user.username === blog.user.username && (
          <button onClick={() => deleteBlog(blog)}>remove</button>
        )}
      </div>
      <BlogComments blog={blog} />
    </section>
  );
};

export default Blog;
