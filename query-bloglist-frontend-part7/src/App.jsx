import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";
import About from "./components/About";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Users from "./components/Users";
import User from "./components/User";
import { useInitializeAuth, useLogout } from "./hooks/loginApiHooks";
import { Routes, Route, Link, Navigate, useMatch } from "react-router-dom";
import { useUsers } from "./hooks/userApiHooks";

const App = () => {
  const loggedUser = useInitializeAuth();
  const { logout: handleLogout } = useLogout();

  const { users, isPending, isError, error } = useUsers();

  const match = useMatch("/users/:id");
  const matchedUser = match
    ? users.find((user) => user.id === match.params.id)
    : null;

  const marginRight = {
    marginRight: 10,
  };

  return (
    <div>
      <nav>
        <Link style={marginRight} to={"/"}>
          home
        </Link>
        <Link style={marginRight} to={"/users"}>
          users
        </Link>
        <Link style={marginRight} to={"/blogs"}>
          blogs
        </Link>
        <Link style={marginRight} to={"/about"}>
          about
        </Link>
        {loggedUser ? (
          <em style={marginRight}>
            logged in as {loggedUser.username}{" "}
            <button onClick={handleLogout}>logout</button>
          </em>
        ) : (
          <Link style={marginRight} to={"/login"}>
            login
          </Link>
        )}
      </nav>
      <Notification />
      <h1>blog app</h1>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/users"
          element={loggedUser ? <Users /> : <Navigate to={"/login"} />}
        />

        <Route
          path="/users/:id"
          element={
            <User
              user={matchedUser}
              isPending={isPending}
              isError={isError}
              error={error}
            />
          }
        />
        <Route
          path="/blogs"
          element={loggedUser ? <Blogs /> : <Navigate to={"/login"} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
      <Footer>
        <br />
        <em>Note app, Department of Computer Science 2024</em>
      </Footer>
    </div>
  );
};

export default App;
