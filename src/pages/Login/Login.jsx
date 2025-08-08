import { useState } from "react";
import axios from "../../api/axios";
import toast from 'react-hot-toast';
import LoginForm from "./LoginForm";
import logo from "../../assets/auth.png";
import { FORM_CONSTANTS } from "../../constants";

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
      console.log("Login successful:", response.data);
      toast.success("Login successful!");
     
    } catch (error) {
      toast.error("Login failed:", error)
    
      if (!error?.response) {
       toast.error("No server response", error)
      } else if (error.response?.status === 400) {
        console.log("Missing Username or Password", error);
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
      <div className="login-background">
        <div className="background-overlay"></div>
      </div>
      <div className="auth-container">
        {sucess ? (
          <h1 className="auth-title">You are Sucessfully loged In</h1>
        ) : (
          <>
          <div className="logo-container">
     <img src={logo} className="logo"/>
          </div>
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
