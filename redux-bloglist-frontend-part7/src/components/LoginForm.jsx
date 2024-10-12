import { useEffect, useState } from "react";
import { initializeUserIfStored } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { loginWith } from "../reducers/userReducer";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginVisible, setLoginVisible] = useState(false);
  const showWhenVisible = { display: loginVisible ? "" : "none" };
  const hideWhenVisible = { display: loginVisible ? "none" : "" };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUserIfStored());
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginWith(username, password));
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <div style={showWhenVisible}>
        <h2>login in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">username </label>
            <input
              id="username"
              name="Username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">password </label>
            <input
              id="password"
              name="Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
      <div style={hideWhenVisible}>
        <h2></h2>
        <button onClick={() => setLoginVisible(true)}>login</button>
      </div>
    </>
  );
};

export default LoginForm;
