import { useField } from "../hooks";
import { useUserDispatch } from "../Contexts/UserContext";
import loginService from "../services/login";
import { useEffect } from "react";

const Login = () => {
  const { reset: usernameReset, ...usernameInput } = useField("text");
  const { reset: passwordReset, ...passwordInput } = useField("text");
  const setUser = useUserDispatch();

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("loggedUserNotes");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username: usernameInput.value,
        password: passwordInput.value,
      });

      localStorage.setItem("loggedUserNotes", JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          username:
          <input {...usernameInput} />
        </label>
        <label>
          password:
          <input {...passwordInput} />
        </label>
        <button>login</button>
      </form>
    </div>
  );
};

export default Login;
