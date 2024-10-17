import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import About from "./components/About";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Users from "./components/Users";
import User from "./components/User";
import { useInitializeAuth, useLogout } from "./hooks/loginApiHooks";
import { Routes, Route, Link, Navigate, useMatch } from "react-router-dom";
import { useUsers } from "./hooks/userApiHooks";
import { useBlogApi } from "./hooks/blogApiHooks";

const App = () => {
  const { user: loggedUser, authInitializing } = useInitializeAuth();
  const { logout: handleLogout } = useLogout();
  const { users, isPending, isError, error } = useUsers();
  const { blogs } = useBlogApi();

  const userPathMatch = useMatch("/users/:id");
  const matchedUser = userPathMatch
    ? users.find((user) => user.id === userPathMatch.params.id)
    : null;

  const blogPathMatch = useMatch("/blogs/:id");
  const matchedBlog = blogPathMatch
    ? blogs.find((blog) => blog.id === blogPathMatch.params.id)
    : null;

  const marginRight = {
    marginRight: 10,
  };

  if (authInitializing) {
    return null;
  }

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
            loggedUser ? (
              <User
                user={matchedUser}
                isPending={isPending}
                isError={isError}
                error={error}
              />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/blogs"
          element={loggedUser ? <Blogs /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/blogs/:id"
          element={
            loggedUser ? (
              <Blog blog={matchedBlog} />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
      <Footer>
        <br />
        <em>Blog app, Department of Computer Science 2024</em>
      </Footer>
    </div>
  );
};

export default App;
