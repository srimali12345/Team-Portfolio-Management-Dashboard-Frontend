import React from "react";
import "../../styles/auth/auth.scss";
import { FORM_CONSTANTS } from "../../constants";

const Register = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username && !email && !password) {
      setError(FORM_CONSTANTS.COMMON.ERROR_MESSAGE);
    } else if (!username) {
      setError(FORM_CONSTANTS.COMMON.ERROR_MESSAGE_USERNAME);
    } else if (!email) {
      setError(FORM_CONSTANTS.COMMON.ERROR_MESSAGE_EMAIL);
    } else if (!password) {
      setError(FORM_CONSTANTS.COMMON.ERROR_MESSAGE_PASSWORD);
    } else {
      setError("");
    }
  };

  return (
    <div className="main-container">
      <div className="auth-container">
        <h1 className="auth-title">{FORM_CONSTANTS.REGISTER.TITLE}</h1>
        <p className="auth-subtitle">{FORM_CONSTANTS.REGISTER.SUBTITLE}</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="username" className="auth-label">
            {FORM_CONSTANTS.COMMON.USERNAME_LABEL}
          </label>
          <input
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder={FORM_CONSTANTS.COMMON.USERNAME_LABEL}
            autoComplete="off"
          />

          <label htmlFor="email" className="auth-label">
            {FORM_CONSTANTS.COMMON.EMAIL_LABEL}
          </label>
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder={FORM_CONSTANTS.COMMON.EMAIL_LABEL}
            autoComplete="off"
          />

          <label htmlFor="password" className="auth-label">
            {FORM_CONSTANTS.COMMON.PASSWORD_LABEL}
          </label>
          <input
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder={FORM_CONSTANTS.COMMON.PASSWORD_LABEL}
            autoComplete="new-password"
          />

          {error && <div className="error-message">{error}</div>}

          <div className="button-container">
            <button className="secondary-button" type="submit">
              {FORM_CONSTANTS.REGISTER.TITLE}
            </button>
          </div>
        </form>
        <div className="login-link-container">
          <p>{FORM_CONSTANTS.LOGIN.LOGIN_LINK_TEXT}</p>
          <button className="default-button">
            {FORM_CONSTANTS.LOGIN.TITLE}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
