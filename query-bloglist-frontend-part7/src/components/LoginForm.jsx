import { useLogin } from "../hooks/loginApiHooks";
import { useState } from "react";

const LoginForm = () => {
  const [loginVisible, setLoginVisible] = useState(true);

  const { username, password, setUsername, setPassword, handleLogin } =
    useLogin();

  const showWhenVisible = { display: loginVisible ? "" : "none" };
  const hideWhenVisible = { display: loginVisible ? "none" : "" };

  return (
    <>
      <div style={showWhenVisible}>
        <div>
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
        <button onClick={() => setLoginVisible(false)}>cancel</button>
      </div>
      <div style={hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)}>login</button>
      </div>
    </>
  );
};

export default LoginForm;
