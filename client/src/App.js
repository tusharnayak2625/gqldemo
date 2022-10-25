import React from 'react';
import { Route, Routes } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AddQuote from './pages/AddQuote';
import Navbar from './components/Navbar';

import "./App.css";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/addquote' element={<AddQuote />} />
      </Routes>
    </>
  )
}

export default App;