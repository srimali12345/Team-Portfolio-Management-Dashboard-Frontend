import React from "react";
import Login from './pages/Login/loginPage.jsx';
import Register from './pages/Register/registerPage.jsx';
import { Route, Routes } from "react-router-dom";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login/>} />
    </Routes>
  );
};

export default AppRoutes;
