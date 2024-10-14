import { useLogin } from "../hooks/useLogin";

const LoginForm = () => {
  const {
    username,
    password,
    setUsername,
    setPassword,
    handleLogin,
    mutationStatus,
  } = useLogin();

  if (mutationStatus.isLoading) return <div>logging in...</div>;

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        password
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button>login</button>
    </form>
  );
};

export default LoginForm;
