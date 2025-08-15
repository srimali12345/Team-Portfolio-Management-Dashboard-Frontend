import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LoginForm from "./authFormLogin";
import logo from "../../assets/auth.png";
import { FORM_CONSTANTS } from "../../constants";
import { loginUser, clearError } from "../../store/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      toast.success(`Welcome ${user?.name || email}!`);
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate, user, email]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = async () => {
    if (!email || !password) {
      if (!email) toast.error("Email is required");
      if (!password) toast.error("Password is required");
      return;
    }
    try {
      await dispatch(loginUser({ email, password })).unwrap();
    } catch (err) {
      toast.error(err || "Login failed. Please check your credentials.");
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
        {error && toast.error(error)}
        <LoginForm
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          onFinish={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Login;
