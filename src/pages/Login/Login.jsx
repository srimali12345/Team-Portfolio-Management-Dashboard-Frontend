import { useRef, useState, useContext } from "react";
import "../../styles/auth/auth.scss";
import { FORM_CONSTANTS } from "../../constants";
import { AuthContext } from "../../context/AuthProvider";
import axios from "../../api/axios";
import LoginForm from "./LoginForm";

const LOGIN_URL = "/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sucess, setSuccess] = useState(false);
  const [err, setError] = useState("");
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accestoken = response?.data?.accestoken;
      const roles = response?.data?.roles;
      setAuth(username, password, roles, accestoken);
      setUsername("");
      setPassword("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setError("No Server Response");
      } else if (err.response?.status === 400) {
        setError("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setError("Unauthorized");
      } else {
        setError("Login Failed");
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
              ref={userRef}
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
