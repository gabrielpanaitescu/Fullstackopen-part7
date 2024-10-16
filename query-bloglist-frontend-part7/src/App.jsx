import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";
import { useInitializeAuth } from "./hooks/loginApiHooks";

const App = () => {
  const user = useInitializeAuth();

  return (
    <div>
      <Notification />
      {user === null ? <LoginForm /> : <Blogs />}
    </div>
  );
};

export default App;
