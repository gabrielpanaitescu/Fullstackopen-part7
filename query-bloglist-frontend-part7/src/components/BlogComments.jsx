import { useRef, useState } from "react";
import Togglable from "./Togglable";
import { useBlogApi } from "../hooks/blogApiHooks";

const BlogComments = ({ blog }) => {
  const [text, setText] = useState("");
  const blogCommentsRef = useRef();
  const { blogCommentMutation } = useBlogApi();

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(text);
    blogCommentMutation.mutate({ id: blog.id, text });
  };

  return (
    <div>
      <h4>Comments</h4>
      <Togglable buttonLabel="add comment" ref={blogCommentsRef}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          />
          <button>post comment</button>
        </form>
      </Togglable>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>
            <div>
              {comment.user.name} - [{formatDate(comment.date)}]
            </div>
            <div>{comment.text}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default BlogComments;
