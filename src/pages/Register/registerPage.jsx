import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import RegisterForm from "./authFormRegister";
import logo from "../../assets/auth.png";
import { FORM_CONSTANTS } from "../../constants";
import { registerUser, clearError } from "../../store/slices/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("viewer");

  useEffect(() => {
    if (isAuthenticated) {
      toast.success(`Welcome ${user?.name || name}!`);
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate, user, name]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = async () => {
    if (!name || !username || !email || !password || !role) {
      if (!name) toast.error("Name is required");
      if (!username) toast.error("Username is required");
      if (!email) toast.error("Email is required");
      if (!password) toast.error("Password is required");
      if (!role) toast.error("Role is required");
      return;
    }

    try {
      await dispatch(registerUser({ name, email, password, role })).unwrap();
      toast.success("Registration successful!");
    } catch (err) {
      toast.error(err || "Registration failed. Please try again.");
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
        <h1 className="auth-title">{FORM_CONSTANTS.REGISTER.TITLE}</h1>
        <p className="auth-subtitle">{FORM_CONSTANTS.REGISTER.SUBTITLE}</p>
        {error && toast.error(error)}
        <RegisterForm
          name={name}
          username={username}
          email={email}
          password={password}
          role={role}
          setName={setName}
          setUsername={setUsername}
          setEmail={setEmail}
          setPassword={setPassword}
          setRole={setRole}
          onFinish={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Register;
