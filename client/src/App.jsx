import React from 'react';
import { useState } from 'react'
import ReactDOM from 'react-dom/client';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/home.jsx'
import Login from './pages/login/login.jsx'
import Explore from './pages/explore/explore.jsx';
import './App.css'
import Topbar from './components/topbar.jsx';
import Signup from './pages/signup/signup.jsx';
import { BrowserRouter } from 'react-router-dom';
import Restaurant from './pages/restaurant/restaurant.jsx';
import { useNavigate } from 'react-router-dom';
function App() {

  return (
    <>
    <Topbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/explore" element={<Explore/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/restaurant:id" element={<Restaurant/>} />
    </Routes>
    </>
  );
}

export default App
