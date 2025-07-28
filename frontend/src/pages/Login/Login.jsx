import React from "react";
import "../../styles/auth/auth.scss";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Username and password are required.");
    } else {
      setError("");
    }
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <h1 className="title-login">Login</h1>
        <p className="sub-title">Welcome back! Please login to your account.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
          />

          <label htmlFor="password">Password</label>
          <input
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />

          {error && <div className="error-message">{error}</div>}

          <div className="button-container">
            <button className="default-button" type="submit">Login</button>
            <button className="secondary-button" type="button">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
