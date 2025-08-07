import { useRef, useState, useContext } from "react";
import { FORM_CONSTANTS } from "../../constants";
import { AuthContext } from "../../context/AuthProvider";
import axios from "../../api/axios";
import LoginForm from "./LoginForm";

const LOGIN_URL = "http://localhost:8080/api/auth/login";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sucess, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(LOGIN_URL, { username, password });
      console.log(response.data);
      setSuccess(true);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Login failed:", error);
      if (!error?.response) {
        console.log("No Server Response");
      } else if (error.response?.status === 400) {
        console.log("Missing Username or Password");
      } else if (error.response?.status === 401) {
        console.log("Unauthorized");
      } else {
        console.log("Login Failed");
      }
    }
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
        {sucess ? (
          <h1 className="auth-title">You are Sucessfully loged In</h1>
        ) : (
          <>
            <h1 className="auth-title">{FORM_CONSTANTS.LOGIN.TITLE}</h1>
            <p className="auth-subtitle">{FORM_CONSTANTS.LOGIN.SUBTITLE}</p>

            <LoginForm
              validateMessages={validateMessages}
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
              onFinish={handleSubmit}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
