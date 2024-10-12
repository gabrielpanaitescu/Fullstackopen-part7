import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <Notification />
      {user === null ? <LoginForm /> : <Blogs />}
    </div>
  );
};

export default App;
