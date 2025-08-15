import React from "react";
import Login from "./pages/Login/loginPage.jsx";
import Register from "./pages/Register/registerPage.jsx";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard.jsx";
import TeamMembers from "./pages/teamMembers.jsx";
import Projects from "./pages/projects.jsx";
import MainLayout from "./components/mainLayout.jsx";
import PortfolioView from "./pages/portfolioView.jsx";
import HomePage from "./pages/home.jsx";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/team-members" element={<TeamMembers />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/portfolio/:id" element={<PortfolioView/>} />

        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
