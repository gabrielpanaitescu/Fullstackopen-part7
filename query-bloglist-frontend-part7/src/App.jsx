import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";
import About from "./components/About";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Users from "./components/Users";
import { useInitializeAuth, useLogout } from "./hooks/loginApiHooks";
import { Routes, Route, Link, Navigate } from "react-router-dom";

const App = () => {
  const user = useInitializeAuth();
  const { logout: handleLogout } = useLogout();

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
        {user ? (
          <em style={marginRight}>
            logged in as {user.username}{" "}
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
          element={user ? <Users /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/blogs"
          element={user ? <Blogs /> : <Navigate to={"/login"} />}
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
