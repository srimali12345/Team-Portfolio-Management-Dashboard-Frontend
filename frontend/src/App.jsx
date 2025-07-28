import React from 'react';
import './styles/common/style.scss'
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import {BrowserRouter, Routes,Route} from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
