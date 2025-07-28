import React from "react";
import '../../styles/auth/auth.scss';

const Register = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div className="main-container register-bg">
      <div className="login-container register-card">
        <h1 className="title-login">Create Account</h1>
        <p className="sub-title">Sign up to manage your team portfolio</p>
        <form className="register-form">
          <label htmlFor="username" className="register-label">Name</label>
          <input
            name="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your name"
            className="register-input"
            autoComplete="off"
          />

          <label htmlFor="email" className="register-label">Email</label>
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className="register-input"
            autoComplete="off"
          />

          <label htmlFor="password" className="register-label">Password</label>
          <input
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Create a password"
            className="register-input"
            autoComplete="new-password"
          />

          <div className="button-container">
            <button className="secondary-button register-btn" type="submit">
              Register
            </button>
          </div>
        </form>
        <div className="login-link-container">
          <p>Already have an account?</p>
          <button className="default-button login-btn">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
