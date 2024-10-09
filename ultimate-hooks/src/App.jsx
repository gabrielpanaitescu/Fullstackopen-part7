import { useField, useResource } from "./hooks";
import Login from "./Components/Login";
import { useUserContextValue, useUserDispatch } from "./Contexts/UserContext";

const App = () => {
  const { reset: resetContent, ...contentInput } = useField("text");
  const { reset: resetName, ...nameInput } = useField("text");
  const { reset: resetNumber, ...numberInput } = useField("text");
  const setUser = useUserDispatch();
  const user = useUserContextValue();

  const [notes, noteService] = useResource(
    "http://localhost:3005/api/notes",
    "notes",
    user ? user.token : null
  );
  const [phonebook, phonebookService] = useResource(
    "http://localhost:3001/api/persons",
    "persons"
  );

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("loggedUserNotes");
  };

  const newNote = (e) => {
    e.preventDefault();
    noteService.createResourceMutation.mutate({
      content: contentInput.value,
      important: false,
    });
    resetContent();
  };

  const newPhonebookEntry = (e) => {
    e.preventDefault();
    phonebookService.createResourceMutation.mutate({
      name: nameInput.value,
      number: numberInput.value,
    });
    resetName();
    resetNumber();
  };

  if (notes.isPending || phonebook.isPending) {
    return <p>loading...</p>;
  }

  if (notes.isError || phonebook.isError) {
    return <p>oops, an error ocurred...{notes.error}</p>;
  }

  return (
    <>
      {!user ? (
        <>
          <Login />
          <p>login is required for the notes api</p>
        </>
      ) : (
        <div>
          <h2>Notes</h2>
          <button onClick={handleLogout}>log out</button>
          <form onSubmit={(e) => newNote(e)}>
            <label>
              content: <input {...contentInput} />
            </label>
            <button>create note</button>
          </form>
          <ul>
            {notes.data &&
              notes.data.map((note) => <li key={note.id}>{note.content}</li>)}
          </ul>
        </div>
      )}
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={(e) => newPhonebookEntry(e)}>
          <label>
            name: <input {...nameInput} />
          </label>
          <label>
            number: <input {...numberInput} />
          </label>
          <button>create phonebook entry</button>
        </form>
        <ul>
          {" "}
          <ul>
            {phonebook.data &&
              phonebook.data.map((person) => (
                <li key={person.id}>
                  {person.name} {person.number}
                </li>
              ))}
          </ul>
        </ul>
      </div>
    </>
  );
};

export default App;
