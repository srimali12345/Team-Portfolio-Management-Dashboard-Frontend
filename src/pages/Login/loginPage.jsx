import { useState } from "react";
import axios from "../../api/axios";
import toast from "react-hot-toast";
import LoginForm from "./authFormLogin";
import logo from "../../assets/auth.png";
import { FORM_CONSTANTS } from "../../constants";
import { useNavigate } from "react-router-dom";

const LOGIN_URL = "http://localhost:8080/api/auth/login";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sucess, setSuccess] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (!username || !password || !role) {
      if (!username) toast.error("Username is required");
      if (!password) toast.error("Password is required");
      if (!role) toast.error("Role is required");
      return;
    }
    try {
      const response = await axios.post(LOGIN_URL, {
        username,
        password,
        role,
      });
      console.log(response.data);
      setSuccess(true);
      setUsername("");
      setPassword("");
      setRole(response.data.role);
      console.log("Login successful:", response.data);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      if (!error?.response) {
        toast.error("No server response");
      } else if (error.response?.status === 401) {
        toast.error("Invalid username or password");
      } else if (error.response?.status === 403) {
        toast.error("Invalid role");
      } else {
        toast.error("Login failed");
      }
    }
  };
  return (
    <div className="main-container">
      <div className="login-background">
        <div className="background-overlay"></div>
      </div>
      <div className="auth-container">
        <div className="logo-container">
          <img src={logo} className="logo" />
        </div>
        <h1 className="auth-title">{FORM_CONSTANTS.LOGIN.TITLE}</h1>
        <p className="auth-subtitle">{FORM_CONSTANTS.LOGIN.SUBTITLE}</p>

        <LoginForm
          username={username}
          password={password}
          role={role}
          setUsername={setUsername}
          setPassword={setPassword}
          onFinish={handleSubmit}
          setRole={setRole}
        />
      </div>
    </div>
  );
};

export default Login;
