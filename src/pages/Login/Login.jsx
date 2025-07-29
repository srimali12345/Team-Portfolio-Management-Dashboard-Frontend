import React from "react";
import "../../styles/auth/auth.scss";
import { FORM_CONSTANTS } from "../../constants";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username && !password) {
      setError(FORM_CONSTANTS.COMMON.ERROR_MESSAGE);
    } else if(!password) {
      setError(FORM_CONSTANTS.COMMON.ERROR_MESSAGE_PASSWORD);
    }else if(!username) {
      setError(FORM_CONSTANTS.COMMON.ERROR_MESSAGE_USERNAME);
    }
  };

  return (
    <div className="main-container">
      <div className="auth-container">
        <h1 className="auth-title">{FORM_CONSTANTS.LOGIN.TITLE}</h1>
        <p className="auth-subtitle">{FORM_CONSTANTS.LOGIN.SUBTITLE}</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-label" htmlFor="username">{FORM_CONSTANTS.COMMON.USERNAME_LABEL}</label>
          <input
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder={FORM_CONSTANTS.COMMON.USERNAME_LABEL}
          />

          <label className="auth-label" htmlFor="password">{FORM_CONSTANTS.COMMON.PASSWORD_LABEL}</label>
          <input
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder={FORM_CONSTANTS.COMMON.PASSWORD_LABEL}
          />

          {error && <div className="error-message">{error}</div>}

          <div className="button-container">
            <button className="default-button" type="submit">{FORM_CONSTANTS.LOGIN.TITLE}</button>
            <button className="secondary-button" type="button">{FORM_CONSTANTS.REGISTER.TITLE}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
