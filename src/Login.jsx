import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:8000/auth/login', {
        email,
        password,
      });

      const token = res.data.access_token;
      localStorage.setItem('token', token);

      // Navigate to dashboard or home page
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-form-wrapper">
          <div className="login-logo">InsideBox</div>
          <h2 className="login-heading">Welcome back</h2>
          <h3 className="login-subheading">Sign in to your account</h3>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="E-mail"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-button">Login</button>
          </form>

          {error && <p className="error-message">{error}</p>}

          <p className="login-alt">or continue with</p>
          <div className="login-socials">
            <button className="login-social-btn">f</button>
            <button className="login-social-btn">G</button>
            <button className="login-social-btn"></button>
          </div>
          <p className="login-login-text">
            Don’t have an account? <Link to="/register" className="login-link">Register</Link>
          </p>
        </div>
      </div>

      <div className="login-right"></div>
    </div>
  );
};

export default Login;
