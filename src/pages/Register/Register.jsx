import React, { useState } from "react";
import { FORM_CONSTANTS } from "../../constants";
import RegisterForm from "./RegisterForm";
import CustomButton from "../../components/CustomButton";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/auth.png";
import toast from "react-hot-toast";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (!username || !name || !email || !password) {
      if (!username && toast.error("Username is required"));
      if (!name && toast.error("Name is required"));
      if (!email && toast.error("Email is invalid"));
      if (!password && toast.error("Password is not valid")) return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          username,
          email,
          name,
          password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      setUsername("");
      setEmail("");
      setPassword("");
      setName("");
      console.log("Registration successful:", response.data);
      toast.success("Registration successful! You can now log in.");
      navigate("/login");
    } catch (error) {
      if (!error?.response) {
        console.log("No Server Response");
      } else if (error.response?.status === 409) {
        toast.error("Username or Email already exists.");
      } else {
        toast.error("Registration failed. Please try again.");
        console.error("Registration Failed", error);
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
        <div className="logo-container">
          <img src={logo} className="logo" />
        </div>
        <h1 className="auth-title">{FORM_CONSTANTS.REGISTER.TITLE}</h1>
        <p className="auth-subtitle">{FORM_CONSTANTS.REGISTER.SUBTITLE}</p>
        <RegisterForm
          validateMessages={validateMessages}
          name={name}
          username={username}
          email={email}
          password={password}
          setName={setName}
          onFinish={handleSubmit}
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
