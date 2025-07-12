import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Notification from './Notification';
import Login from './Login';
import Register from './Register';
const App = () => {
  const [search, setSearch] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleLogin = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      localStorage.removeItem('token');
    } else {
      setIsLoggedIn(true);
      localStorage.setItem('token', 'mock-token');
    }
  };

  return (
    <Router>
      <Navbar
        search={search}
        setSearch={setSearch}
        isLoggedIn={isLoggedIn}
        toggleLogin={toggleLogin}
      />
      <Routes>
        <Route path="/" element={<Dashboard search={search} isLoggedIn={isLoggedIn} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;