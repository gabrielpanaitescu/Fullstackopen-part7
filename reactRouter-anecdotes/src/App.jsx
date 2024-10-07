import { useState } from "react";
import initialAnecdotes from "./anecdotes";
import { Routes, Link, Route, useMatch } from "react-router-dom";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };

  return (
    <div>
      <Link to="/" style={padding}>
        Anecdotes
      </Link>
      <Link to="/create" style={padding}>
        Create new
      </Link>
      <Link to="/about" style={padding}>
        About
      </Link>
    </div>
  );
};

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>
      {anecdote.content} by {anecdote.author}
    </h2>
    <p>has {anecdote.votes} votes</p>
    <p>for more info visit {anecdote.url}</p>
  </div>
);

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const CreateNew = ({ createAnecdote }) => {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createAnecdote({
      content,
      author,
      url,
      votes: 0,
    });
    setContent("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content:
          <input
            type="text"
            value={content}
            name="content"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="url"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

const About = () => (
  <div>
    <h2>About </h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
  </div>
);

const App = () => {
  const [anecdotes, setAnecdotes] = useState(initialAnecdotes);

  const createAnecdote = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 1000000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const voteAnecdote = (id) => {
    const targetAnecdote = anecdotes.find((anecdote) => anecdote.id === id);

    const changedAnecdote = {
      ...targetAnecdote,
      votes: targetAnecdote.votes + 1,
    };

    setAnecdotes(
      anecdotes.map((anecdote) =>
        anecdote.id === id ? changedAnecdote : anecdote
      )
    );
  };

  const match = useMatch("/anecdotes/:id");
  console.log(match);
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null;

  console.log(anecdote);

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path="/create"
          element={<CreateNew createAnecdote={createAnecdote} />}
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
