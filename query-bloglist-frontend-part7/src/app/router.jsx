import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useMatch,
  useParams,
} from "react-router-dom";
import AppRoot from "./routes/root";
import Home from "./routes/Home";
import BlogList from "./routes/BlogList";
import Blog from "./routes/Blog/Blog";
import Users from "./routes/Users";
import User from "./routes/User";
import Authentication from "./routes/Authentication";
import { useGetUsers } from "../hooks/query/useUsers";
import { useBlogs } from "../hooks/query/useBlogs";
import { useAuthState } from "../contexts/AuthContext";
import { useInitializeAuth } from "../hooks/query/useAuth";
import ErrorElement from "./routes/ErrorElement";

const ProtectedRoute = ({ children }) => {
  const user = useAuthState();

  return user ? children : <Navigate to={"/login"} replace />;
};

const UserLoader = () => {
  const { users, isPending, isError, error } = useGetUsers();
  const match = useMatch("/users/:id");
  const matchedUser = match
    ? users.find((user) => user.id === match.params.id)
    : null;

  return (
    <User
      user={matchedUser}
      isPending={isPending}
      isError={isError}
      error={error}
    />
  );
};

const BlogLoader = () => {
  const { blogs } = useBlogs();
  const { id } = useParams();

  const matchedBlog = blogs.find((blog) => blog.id === id);

  return <Blog blog={matchedBlog} />;
};

const router = createBrowserRouter([
  {
    element: <AppRoot />,
    path: "/",
    errorElement: <ErrorElement />,
    children: [
      {
        errorElement: <ErrorElement />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/users",
            element: (
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            ),
          },
          {
            path: "/users/:id",
            element: (
              <ProtectedRoute>
                <UserLoader />
              </ProtectedRoute>
            ),
          },
          {
            path: "/blogs",
            element: (
              <ProtectedRoute>
                <BlogList />
              </ProtectedRoute>
            ),
          },
          {
            path: "/blogs/:id",
            element: (
              <ProtectedRoute>
                <BlogLoader />
              </ProtectedRoute>
            ),
          },
          {
            path: "/login",
            element: <Authentication />,
          },
        ],
      },
    ],
  },
]);

export const AppRouter = () => {
  const { authInitializing } = useInitializeAuth();

  if (authInitializing) {
    return null;
  }
  return <RouterProvider router={router} />;
};
