import { useNotificationDispatch } from "../Contexts/NotificationContext";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const AnecdoteForm = ({ addAnecdote }) => {
  const { reset: resetContent, ...content } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetUrl, ...url } = useField("text");

  const navigate = useNavigate();
  const setNotification = useNotificationDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    addAnecdote({
      content: content.value,
      author: author.value,
      url: url.value,
      votes: 0,
    });
    setNotification(`added anecdote "${content.value}" by "${author.value}"`);
    navigate("/");
  };

  const handleReset = () => {
    resetContent();
    resetAuthor();
    resetUrl();
  };

  return (
    <div>
      <h2>Create new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          content:
          <input {...content} />
        </div>
        <div>
          author:
          <input {...author} />
        </div>
        <div>
          url:
          <input {...url} />
        </div>
        <button>create</button>
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
