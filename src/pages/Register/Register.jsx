import React from "react";
import { FORM_CONSTANTS } from "../../constants";
import RegisterForm from "./RegisterForm";
import CustomButton from "../../components/CustomButton";

const Register = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (username, email) => {
    console.log(username, email);
  };
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      password: "${label} is not a valid password!",
    },
    string: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  return (
    <div className="main-container">
      <div className="auth-container">
        <h1 className="auth-title">{FORM_CONSTANTS.REGISTER.TITLE}</h1>
        <p className="auth-subtitle">{FORM_CONSTANTS.REGISTER.SUBTITLE}</p>
        <RegisterForm
          validateMessages={validateMessages}
          onFinish={handleSubmit}
          username={username}
          email={email}
          password={password}
          setUsername={setUsername}
          setEmail={setEmail}
          setPassword={setPassword}
        />
        <div className="login-link-container">
          <p>{FORM_CONSTANTS.LOGIN.LOGIN_LINK_TEXT}</p>
          <CustomButton className="default-button" href="/login">
            {FORM_CONSTANTS.LOGIN.TITLE}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default Register;
