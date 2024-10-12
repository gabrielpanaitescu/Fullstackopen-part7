import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";
import { useSelector, useDispatch } from "react-redux";
import { initializeUserIfStored } from "./reducers/userReducer";
import { useEffect } from "react";
const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUserIfStored());
  }, []);
  return (
    <div>
      <Notification />
      {user === null ? <LoginForm /> : <Blogs />}
    </div>
  );
};

export default App;
