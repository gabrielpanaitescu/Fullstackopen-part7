import { useState } from "react";
import initialAnecdotes from "./anecdotes";
import { Routes, Route, useMatch } from "react-router-dom";
import Notification from "./components/Notification";
import Menu from "./components/Menu";
import AnecdoteList from "./components/AnecdoteList";
import Anecdote from "./components/Anecdote";
import AnecdoteForm from "./components/AnecdoteForm";
import Footer from "./components/Footer";
import About from "./components/About";

const App = () => {
  const [anecdotes, setAnecdotes] = useState(initialAnecdotes);

  const addAnecdote = (anecdote) => {
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

  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null;

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path="/create"
          element={<AnecdoteForm addAnecdote={addAnecdote} />}
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
