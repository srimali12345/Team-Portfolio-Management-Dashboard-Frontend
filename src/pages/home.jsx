import React from "react";
import { Link } from "react-router-dom";
import { FORM_CONSTANTS, HOME_CONSTANT } from "../constants";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="banner">
        <div className="overlay">
          <h1 className="title">{HOME_CONSTANT.WELCOME}</h1>
          <p className="subtitle">
           {HOME_CONSTANT.MANAGE_PROJECTS}
          </p>
          <div className="button-group">
            <Link to="/login" className="custom-button login-btn">
           {FORM_CONSTANTS.LOGIN.TITLE}
            </Link>
            <Link to="/register" className="custom-button signup-btn">
            {FORM_CONSTANTS.REGISTER.TITLE}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
