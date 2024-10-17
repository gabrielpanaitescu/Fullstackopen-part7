import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/loginApiHooks";
import { useEffect, useState } from "react";
import { useAuthState } from "../contexts/AuthContext";

const LoginForm = () => {
  const user = useAuthState();
  const [loginVisible, setLoginVisible] = useState(true);
  const navigate = useNavigate();
  const { username, password, setUsername, setPassword, handleLogin } =
    useLogin();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleSubmit = (e) => {
    handleLogin(e);
  };

  const showWhenVisible = { display: loginVisible ? "" : "none" };
  const hideWhenVisible = { display: loginVisible ? "none" : "" };

  return (
    <>
      <div style={showWhenVisible}>
        <div>
          <h2>log in to application</h2>
          <form onSubmit={handleSubmit}>
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
