import Authentication from "./routes/Authentication";
import Notification from "./components/Notification";
import BlogList from "./routes/BlogList";
import Blog from "./components/Blog/Blog";
import Home from "./routes/Home";
import Footer from "./components/Footer/Footer";
import Users from "./routes/Users";
import User from "./components/User";
import { Routes, Route, Navigate, useMatch } from "react-router-dom";
import { useGetUsers } from "./hooks/query/useUsers";
import { useBlogs } from "./hooks/query/useBlogs";
import { useInitializeAuth, useLogout } from "./hooks/query/useAuth";
import { Header } from "./components/Header/Header";
import { Container } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";

const App = () => {
  const { user: loggedUser, authInitializing } = useInitializeAuth();
  const { logout: handleLogout } = useLogout();
  const { users, isPending, isError, error } = useGetUsers();
  const { blogs } = useBlogs();

  const userPathMatch = useMatch("/users/:id");
  const matchedUser = userPathMatch
    ? users.find((user) => user.id === userPathMatch.params.id)
    : null;

  const blogPathMatch = useMatch("/blogs/:id");
  const matchedBlog = blogPathMatch
    ? blogs.find((blog) => blog.id === blogPathMatch.params.id)
    : null;

  if (authInitializing) {
    return null;
  }

  return (
    <>
      <Header loggedUser={loggedUser} handleLogout={handleLogout} />
      <Notification />
      <Notifications />
      <Container>
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
            element={loggedUser ? <BlogList /> : <Navigate to={"/login"} />}
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
          <Route path="/login" element={<Authentication />} />
        </Routes>
      </Container>
      {/* <Footer /> */}
    </>
  );
};

export default App;
