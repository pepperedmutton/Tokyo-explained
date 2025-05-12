import React from 'react';
import { useState } from 'react'
import ReactDOM from 'react-dom/client';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/home.jsx'
import Login from './pages/login/login.jsx'
import './App.css'
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App
